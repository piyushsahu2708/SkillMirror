import type { Metadata } from 'next';
import { Toaster } from "@/components/ui/toaster"
import './globals.css';
import SmoothScroll from '@/components/smooth-scroll';
import ScrollProgress from '@/components/scroll-progress';

export const metadata: Metadata = {
  title: 'SkillMirror',
  description: 'Full Stack Skill Verification Platform',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <ScrollProgress />
        <SmoothScroll>
          {children}
        </SmoothScroll>
        <Toaster />
      </body>
    </html>
  );
}
