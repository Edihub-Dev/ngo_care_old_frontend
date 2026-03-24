'use client';

import { usePathname } from 'next/navigation';
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isAuthPage = pathname === '/login' || 
                     pathname === '/register' || 
                     pathname === '/forgot-password' || 
                     pathname === '/verify-otp' || 
                     pathname === '/reset-password';

  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-white text-black overflow-x-hidden ${isAuthPage ? '' : 'pt-24'}`}>
        {!isAuthPage && <Navigation />}
        <main>
          {children}
        </main>
        {!isAuthPage && <Footer />}
      </body>
    </html>
  );
}
