import { ContactForm } from '@/components/contact-form';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact — Rich Bartlett',
  description: 'Get in touch with Rich Bartlett — learning design, UX projects, or just a conversation.',
};

export default function ContactPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <header className="border-b border-border pb-10 mb-12 grid md:grid-cols-2 gap-8 items-end">
        <div>
          <p className="text-sm font-medium text-accent uppercase tracking-widest mb-3">
            Contact
          </p>
          <h1 className="font-headline font-semibold text-4xl md:text-5xl leading-tight">
            Let's talk.
          </h1>
        </div>
        <p className="text-muted-foreground leading-relaxed">
          Have a project in mind, want to collaborate, or just want to say hello? Fill out the
          form and I'll get back to you.
        </p>
      </header>

      <div className="max-w-xl">
        <ContactForm />
      </div>
    </div>
  );
}
