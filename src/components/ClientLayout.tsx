'use client';

import { usePathname } from 'next/navigation';
import { Toaster } from 'react-hot-toast';
import Navigation from "./Navigation";
import Footer from "./Footer";
import { SettingsProvider } from '@/context/SettingsContext';

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  
  // Routes that should NOT show the general Navigation and Footer
  const isNoNavPage = pathname === '/login' || 
                      pathname === '/register' || 
                      pathname === '/forgot-password' || 
                      pathname === '/verify-otp' || 
                      pathname === '/reset-password' ||
                      pathname.startsWith('/dashboard') ||
                      pathname.startsWith('/services');

  return (
    <SettingsProvider>
      <Toaster position="top-center" reverseOrder={false} />
      {!isNoNavPage && <Navigation />}
      <main>
        {children}
      </main>
      {!isNoNavPage && <Footer />}
    </SettingsProvider>
  );
}
