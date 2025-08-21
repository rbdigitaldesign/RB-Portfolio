'use server';

import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  message: z
    .string()
    .min(10, { message: 'Message must be at least 10 characters.' })
    .max(500, { message: 'Message must not be longer than 500 characters.' }),
  recaptchaToken: z.string().min(1, { message: 'reCAPTCHA verification failed.' }),
});

async function verifyRecaptcha(token: string) {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  if (!secretKey) {
    console.error('reCAPTCHA secret key is not set.');
    // In a real app, you might want to fail open or closed depending on your security posture.
    // For this example, we'll fail open in dev but could fail closed in prod.
    return { success: process.env.NODE_ENV !== 'production' };
  }

  const verificationUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`;

  try {
    const response = await fetch(verificationUrl, { method: 'POST' });
    const data = await response.json();
    
    // For v3, success just means the token was valid. We also need to check the score.
    // A score of 0.5 is a common threshold.
    return data.success && data.score >= 0.5;
  } catch (error) {
    console.error('Error verifying reCAPTCHA:', error);
    return false;
  }
}


export async function sendContactMessage(formData: FormData) {
  const rawData = {
    name: formData.get('name'),
    email: formData.get('email'),
    message: formData.get('message'),
    recaptchaToken: formData.get('recaptchaToken'),
  };

  const parsed = contactSchema.safeParse(rawData);

  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.errors.map((e) => e.message).join(', '),
    };
  }
  
  const { name, email, message, recaptchaToken } = parsed.data;

  const isRecaptchaValid = await verifyRecaptcha(recaptchaToken);
  if (!isRecaptchaValid) {
    return {
      success: false,
      error: 'Failed to verify reCAPTCHA. Please try again.',
    };
  }

  const to = 'rbdigitaldesign11@gmail.com';
  const subject = `New message from ${name} via your portfolio`;
  const body = `
    You've received a new message:
    
    From: ${name}
    Email: ${email}
    
    Message:
    ${message}
  `;

  try {
    // In a real application, you would use an email sending service here.
    // For example, using Resend, Nodemailer, or another provider.
    // This requires API keys and further setup, so for now, we will
    // just log the email to the server console.
    console.log('--- New Contact Form Submission ---');
    console.log('To:', to);
    console.log('Subject:', subject);
    console.log('Body:', body);
    console.log('-----------------------------------');
    
    // Simulate a successful email send.
    return { success: true };

  } catch (error) {
    console.error('Failed to send contact message:', error);
    return { 
      success: false, 
      error: 'An unexpected error occurred on the server.' 
    };
  }
}
