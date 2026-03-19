'use server';

import { z } from 'zod';
import { Resend } from 'resend';

const waitlistSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  interest: z.string().optional(),
});

export async function joinWaitlist(formData: FormData) {
  const parsed = waitlistSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    interest: formData.get('interest'),
  });

  if (!parsed.success) {
    return { success: false, error: parsed.error.errors.map((e) => e.message).join(', ') };
  }

  const { name, email, interest } = parsed.data;

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // Graceful fallback — log and return success so UX isn't broken during dev
    console.warn('RESEND_API_KEY not set — waitlist entry not recorded:', { name, email });
    return { success: true };
  }

  const resend = new Resend(apiKey);

  const FROM_NAME = process.env.CONTACT_FROM_NAME || 'RB Digital Design';
  const FROM_EMAIL = process.env.CONTACT_FROM_EMAIL || 'hello@rbdigitaldesign.com';
  const TO_EMAIL = process.env.CONTACT_TO_EMAIL || 'rbdigitaldesign11@gmail.com';

  try {
    const { error } = await resend.emails.send({
      from: `${FROM_NAME} <${FROM_EMAIL}>`,
      to: [TO_EMAIL],
      reply_to: [email],
      subject: `ShowerBoost waitlist: ${name}`,
      text: [
        `New ShowerBoost waitlist signup`,
        '',
        `Name: ${name}`,
        `Email: ${email}`,
        interest ? `Interest: ${interest}` : '',
      ]
        .filter(Boolean)
        .join('\n'),
      html: `
        <h2>New ShowerBoost Waitlist Signup</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${interest ? `<p><strong>What they said:</strong> ${interest.replace(/\n/g, '<br>')}</p>` : ''}
      `,
    });

    if (error) {
      console.error('Resend waitlist error:', error);
      return { success: false, error: 'Failed to record your interest. Please try again.' };
    }

    return { success: true };
  } catch (err) {
    console.error('Waitlist signup failed:', err);
    return { success: false, error: 'An unexpected error occurred.' };
  }
}
