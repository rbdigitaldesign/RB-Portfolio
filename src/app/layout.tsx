
import type { Metadata } from 'next';
import './globals.css';
import localFont from 'next/font/local';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';
import { Analytics } from '@vercel/analytics/react';

// Ananias — local display serif for headlines
const fontHeadline = localFont({
  src: [
    { path: '../../public/fonts/Ananias.ttf', weight: '400', style: 'normal' },
    { path: '../../public/fonts/Ananias Bold.ttf', weight: '700', style: 'normal' },
  ],
  variable: '--font-headline',
  display: 'swap',
  // Fraunces (Google Fonts) is also referenced via CSS variable override in globals.css
  fallback: ['Georgia', 'serif'],
});

// Body font — Ananias used as a placeholder; Inter loaded via Google Fonts <link>
// This keeps the build offline-compatible while production loads Inter
const fontBody = localFont({
  src: [
    { path: '../../public/fonts/Ananias.ttf', weight: '400', style: 'normal' },
  ],
  variable: '--font-body',
  display: 'swap',
  fallback: [
    'Inter',
    '-apple-system',
    'BlinkMacSystemFont',
    'Segoe UI',
    'Roboto',
    'Helvetica Neue',
    'Arial',
    'sans-serif',
  ],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:9002'),
  title: 'Rich Bartlett — Learning Designer & UX',
  description:
    'Portfolio of Rich Bartlett, an LDX Designer based in Australia. Learning Design, UX Research, and educational technology that actually works.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="msvalidate.01" content="F0DB3F2938BA0B6100F08D7C9110118C" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#1A3C34" />
        <meta name="msapplication-TileColor" content="#1A3C34" />
        <meta name="theme-color" content="#FAFAF8" />
        <meta name="apple-mobile-web-app-title" content="Rich Bartlett" />
        {/* Google Fonts — Inter + Fraunces loaded async for production */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300..700&family=Inter:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={cn(
          'min-h-screen bg-background font-body antialiased',
          fontBody.variable,
          fontHeadline.variable
        )}
      >
        <div className="relative flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
        <Toaster />
        <Analytics />
      </body>
    </html>
  );
}
