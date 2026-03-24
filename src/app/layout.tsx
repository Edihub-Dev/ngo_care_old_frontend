import { Metadata } from 'next';
import "./globals.css";

import ClientLayout from "@/components/ClientLayout";

export const metadata: Metadata = {
  title: "Golden Years Care Foundation - Dignity, Care & Companionship for Elders",
  description: "A nonprofit foundation dedicated to providing dignity, care, and companionship for elders.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased min-h-screen bg-white text-black overflow-x-hidden">
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
