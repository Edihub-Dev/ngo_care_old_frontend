import { usePathname } from 'next/navigation';
import Navigation from "./Navigation";
import Footer from "./Footer";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAuthPage = pathname === '/login' || 
                     pathname === '/register' || 
                     pathname === '/forgot-password' || 
                     pathname === '/verify-otp' || 
                     pathname === '/reset-password';

  return (
    <>
      {!isAuthPage && <Navigation />}
      <div className={isAuthPage ? '' : 'pt-24'}>
        <main>
          {children}
        </main>
      </div>
      {!isAuthPage && <Footer />}
    </>
  );
}
