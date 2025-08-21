
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service | RB Digital Design',
  description: 'Terms of Service for the RB Digital Design portfolio website.',
};

export default function TermsOfServicePage() {
  return (
    <div className="container mx-auto max-w-4xl py-16 px-4">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold font-headline">Terms of Service</h1>
         <p className="text-muted-foreground mt-2">Last updated: {new Date().toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
      </header>
       <div className="prose dark:prose-invert max-w-none mx-auto">
        <h2>1. Terms</h2>
        <p>
          By accessing this website, you are agreeing to be bound by these terms of service, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws. If you do not agree with any of these terms, you are prohibited from using or accessing this site. The materials contained in this website are protected by applicable copyright and trademark law.
        </p>
        <h2>2. Use License</h2>
        <p>
          Permission is granted to temporarily download one copy of the materials (information or software) on this website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
        </p>
        <ul>
          <li>modify or copy the materials;</li>
          <li>use the materials for any commercial purpose, or for any public display (commercial or non-commercial);</li>
          <li>attempt to decompile or reverse engineer any software contained on this website;</li>
          <li>remove any copyright or other proprietary notations from the materials; or</li>
          <li>transfer the materials to another person or "mirror" the materials on any other server.</li>
        </ul>
        <p>
          This license shall automatically terminate if you violate any of these restrictions and may be terminated by me at any time. Upon terminating your viewing of these materials or upon the termination of this license, you must destroy any downloaded materials in your possession whether in electronic or printed format.
        </p>
        <h2>3. Disclaimer</h2>
        <p>
          The materials on this website are provided on an 'as is' basis. I make no warranties, expressed or implied, and hereby disclaim and negate all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
        </p>
        <h2>4. Limitations</h2>
        <p>
          In no event shall I or my suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on this website, even if I or an authorized representative has been notified orally or in writing of the possibility of such damage.
        </p>
        <h2>5. Governing Law</h2>
        <p>
          These terms and conditions are governed by and construed in accordance with the laws of South Australia, Australia and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.
        </p>
        <h2>6. Intellectual Property and Employer Content</h2>
        <p>
          This website is a personal portfolio intended to showcase my professional experience, skills, and projects. While I may reference work undertaken during my employment or collaboration with organisations such as the University of Adelaide, Adelaide University, or other institutions and employers, all views, opinions, and interpretations expressed here are solely my own and do not represent those of any employer or client.
        </p>
        <p>
          Any materials, descriptions, or examples included on this site are shared in good faith for educational and illustrative purposes. Where such materials relate to work undertaken as part of my employment or contracts, they are either publicly available, sufficiently anonymised, or adapted to respect confidentiality obligations.
        </p>
        <p>
          Nothing on this website should be construed as granting rights to use, reproduce, or commercialise any intellectual property belonging to the University of Adelaide, Adelaide University, or any other employer, past or present.
        </p>
        <p>
          Any ideas or projects I share that arose in the course of my professional work are presented for demonstration purposes only. Rights to exploit or commercialise such ideas may be subject to the intellectual property policies of my employer(s) at the time the ideas were conceived. Users of this site should not assume any license or transfer of such rights.
        </p>
      </div>
    </div>
  );
}
