
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export default function ResumePage() {
  return (
    <div className="container mx-auto max-w-4xl py-16 px-4">
      <div className="text-center">
        <h1 className="text-4xl font-bold font-headline mb-4">My Résumé</h1>
        <p className="text-xl text-muted-foreground mb-8">
          You can view or download my full résumé for more details on my experience and qualifications.
        </p>
        <Button asChild size="lg">
          <a 
            href="https://docs.google.com/document/d/1RIHsBSdbUdbeABwg0y3Ql_aiKISd0hpSJM7DIgJK3I8/export?format=pdf" 
            target="_blank" 
            rel="noopener noreferrer"
            download="Rich_Bartlett_Resume.pdf"
          >
            <Download className="mr-2 h-5 w-5" />
            Download Résumé (PDF)
          </a>
        </Button>
      </div>
    </div>
  );
}
