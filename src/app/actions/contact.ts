
'use server';

import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters.' }).max(500, { message: 'Message must not be longer than 500 characters.' }),
  recaptchaToken: z.string().min(1, { message: 'reCAPTCHA verification failed.' }),
  recaptchaAction: z.string().optional(),
});

async function verifyRecaptcha(token: string) {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  if (!secretKey) {
    console.error('reCAPTCHA secret key is not set (RECAPTCHA_SECRET_KEY).');
    return { success: false, score: 0, action: undefined, errorCodes: ['missing-secret'] };
  }

  const res = await fetch('https://www.google.com/recaptcha/api/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ secret: secretKey, response: token }),
    cache: 'no-store',
  });

  const data = await res.json();
  return {
    success: Boolean(data.success),
    score: typeof data.score === 'number' ? data.score : 0,
    action: data.action as string | undefined,
    errorCodes: data['error-codes'] as string[] | undefined,
  };
}

export async function sendContactMessage(formData: FormData) {
  const rawData = {
    name: formData.get('name'),
    email: formData.get('email'),
    message: formData.get('message'),
    recaptchaToken: formData.get('recaptchaToken'),
    recaptchaAction: formData.get('recaptchaAction'),
  };

  const parsed = contactSchema.safeParse(rawData);
  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.errors.map((e) => e.message).join(', '),
    };
  }

  const { name, email, message, recaptchaToken, recaptchaAction } = parsed.data;

  const verify = await verifyRecaptcha(recaptchaToken);
  console.log('[reCAPTCHA verify]', verify); // keep during testing

  const minScore = 0.3; // start lenient, tune later
  const expectedAction = recaptchaAction ?? 'contact_submit';

  if (!verify.success || (verify.score ?? 0) < minScore || verify.action !== expectedAction) {
    console.error('reCAPTCHA verification failed', { verify, expectedAction });
    return { success: false, error: 'Failed to verify reCAPTCHA. Please try again.' };
  }

  // TODO: send an email via your provider here. For now we log:
  console.log('--- New Contact Form Submission ---');
  console.log('From:', name, `<${email}>`);
  console.log('Message:', message);
  console.log('-----------------------------------');

  return { success: true };
}
