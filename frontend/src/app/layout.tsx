import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';

import { BackgroundContainer } from '@/components/ui/background-container';
import { Toaster } from '@/components/ui/toaster';
import { SITE_NAME } from '@/constants/site-info';
import { Providers } from '@/providers';

import './globals.css';
import '@rainbow-me/rainbowkit/styles.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: SITE_NAME,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <BackgroundContainer>
            {children}
          </BackgroundContainer>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
