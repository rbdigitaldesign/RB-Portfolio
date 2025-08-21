'use server';

import { z } from 'zod';
import { Resend } from 'resend';

const contactSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  message: z
    .string()
    .min(10, { message: 'Message must be at least 10 characters.' })
    .max(500, { message: 'Message must not be longer than 500 characters.' }),
  recaptchaToken: z.string().min(1, { message: 'reCAPTCHA verification failed.' }),
  recaptchaAction: z.string().optional(),
});

// server-side reCAPTCHA v3 verification
async function verifyRecaptcha(token: string) {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  if (!secretKey) {
    console.error('reCAPTCHA secret key is not set (RECAPTCHA_SECRET_KEY).');
    return { success: false, score: 0, action: undefined as string | undefined, errorCodes: ['missing-secret'] as string[] };
  }

  const res = await fetch('https://www.google.com/recaptcha/api/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ secret: secretKey, response: token }),
    // removed cache: 'no-store' to avoid TS lib/dom mismatch warnings
  });

  const data: any = await res.json();
  return {
    success: !!data.success,
    score: typeof data.score === 'number' ? data.score : 0,
    action: typeof data.action === 'string' ? data.action : undefined,
    errorCodes: Array.isArray(data['error-codes']) ? (data['error-codes'] as string[]) : undefined,
  };
}

export async function sendContactMessage(formData: FormData) {
  // 1) validate input
  const parsed = contactSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    message: formData.get('message'),
    recaptchaToken: formData.get('recaptchaToken'),
    recaptchaAction: formData.get('recaptchaAction'),
  });

  if (!parsed.success) {
    return { success: false, error: parsed.error.errors.map(e => e.message).join(', ') };
  }

  const { name, email, message, recaptchaToken, recaptchaAction } = parsed.data;

  // 2) verify reCAPTCHA (v3)
  const verify = await verifyRecaptcha(recaptchaToken);
  console.log('[reCAPTCHA verify]', verify); // keep during testing

  const minScore = 0.3; // tune later
  const expectedAction = recaptchaAction ?? 'contact_submit';
  const actionOk = verify.action ? verify.action === expectedAction : true;

  if (!verify.success || (verify.score ?? 0) < minScore || !actionOk) {
    console.error('reCAPTCHA verification failed', { verify, expectedAction });
    return { success: false, error: 'Failed to verify reCAPTCHA. Please try again.' };
  }

  // 3) send the email via Resend
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error('RESEND_API_KEY is not set.');
    return { success: false, error: 'Email service not configured.' };
  }

  const resend = new Resend(apiKey);

  // prefer your verified domain; allow overrides via env
  const FROM_NAME = process.env.CONTACT_FROM_NAME || 'RB Digital Design';
  const FROM_EMAIL = process.env.CONTACT_FROM_EMAIL || 'hello@rbdigitaldesign.com';
  const TO_EMAIL = process.env.CONTACT_TO_EMAIL || 'rbdigitaldesign11@gmail.com';
  const BCC_EMAIL = process.env.CONTACT_BCC_EMAIL;

  try {
    const { data, error } = await resend.emails.send({
      from: `${FROM_NAME} <${FROM_EMAIL}>`,
      to: [TO_EMAIL],
      ...(BCC_EMAIL ? { bcc: [BCC_EMAIL] } : {}),
      // some SDK versions want reply_to as string[]
      reply_to: [email],
      subject: `New message from ${name}`,
      text: [`From: ${name} <${email}>`, '', message].join('\n'),
      html: `
        <p><strong>From:</strong> ${name} &lt;${email}&gt;</p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return { success: false, error: 'Failed to send email.' };
    }

    console.log('Contact email sent:', data?.id);
    return { success: true };
  } catch (err) {
    console.error('Failed to send contact message:', err);
    return { success: false, error: 'An unexpected server error occurred.' };
  }
}
