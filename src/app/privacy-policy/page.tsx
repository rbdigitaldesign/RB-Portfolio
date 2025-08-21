
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | RB Digital Design',
  description: 'Privacy Policy for the RB Digital Design portfolio website.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto max-w-4xl py-16 px-4">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold font-headline">Privacy Policy</h1>
        <p className="text-muted-foreground mt-2">Last updated: 21 August 2025</p>
      </header>
      <div className="prose dark:prose-invert max-w-none mx-auto">
        <p>
          This Privacy Policy describes how your personal information is collected, used, and shared when you visit or interact with this website (the "Site").
        </p>

        <h2>Personal Information I Collect</h2>
        <p>
          When you use the contact form on the Site, I collect the personal information you give me such as your name, email address, and message. This is so I can respond to your inquiry.
        </p>
        <p>
          This site uses Google reCAPTCHA to protect against spam and abuse. Use of reCAPTCHA is subject to the Google <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Privacy Policy</a> and <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer">Terms of Service</a>.
        </p>
        <p>
          Messages are delivered to me through a third-party email service provider (Resend), which processes your data only for the purpose of delivering the message to my inbox.
        </p>
        
        <h2>How Do I Use Your Personal Information?</h2>
        <p>
          I use the personal information I collect from you via the contact form solely to communicate with you in response to your inquiries.
        </p>

        <h2>Sharing Your Personal Information</h2>
        <p>
          I do not share your personal information with third parties, except as required to comply with applicable laws and regulations, or to otherwise protect my rights.
        </p>

        <h2>Data Retention</h2>
        <p>
          When you submit an inquiry through the contact form, I will maintain your information for my records unless and until you ask me to delete this information.
        </p>
        
        <h2>Your Rights</h2>
        <p>
          You have the right to access personal information I hold about you and to ask that your personal information be corrected, updated, or deleted. If you would like to exercise this right, please contact me through the contact form.
        </p>
        
        <h2>Changes</h2>
        <p>
          I may update this privacy policy from time to time in order to reflect, for example, changes to my practices or for other operational, legal or regulatory reasons.
        </p>

        <h2>Contact Me</h2>
        <p>
          For more information about my privacy practices, if you have questions, or if you would like to make a complaint, please contact me by using the details provided on the contact page.
        </p>
        
        <h2>Governing Law</h2>
        <p>
          This Privacy Policy is governed by the laws of South Australia, Australia.
        </p>
      </div>
    </div>
  );
}
