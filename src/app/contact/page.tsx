import { ContactForm } from "@/components/contact-form";

export default function ContactPage() {
  return (
    <div className="container mx-auto max-w-4xl py-16 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold font-headline mb-2">Get In Touch</h1>
        <p className="text-xl text-muted-foreground">
          Have a project in mind or just want to connect? I'd love to hear from you.
        </p>
      </div>
      <ContactForm />
    </div>
  );
}
