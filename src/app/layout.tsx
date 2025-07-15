import Header from '@/components/layout/Header';
import './globals.css';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import SubHeader from '@/components/layout/SubHeader';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="flex flex-col items-center justify-center min-h-screen bg-white">
        <div className="relative w-full min-w-[400px] max-w-[768px] min-h-dvh bg-white">
          <Header />
          {/* <SubHeader /> */}
          {children}
          <Footer />
          <Navigation />
        </div>
      </body>
    </html>
  );
}
