import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import './globals.css';
import localFont from 'next/font/local';

import Script from 'next/script';
import HeaderLayout from '@/app/HeaderLayout';

const pretendard = localFont({
  src: '../../public/font/PretendardVariable.ttf',
  display: 'swap', // 폰트 로딩
  weight: '45 920',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <Script src="https://developers.kakao.com/sdk/js/kakao.js" strategy="afterInteractive" />
      <body className={`flex flex-col items-center justify-center min-h-screen bg-white ${pretendard.className} `}>
        <div className="flex flex-col relative w-full min-h-dvh bg-white">
          <HeaderLayout />
          <div className="flex-1 mx-auto lg:px-8 w-full max-w-7xl min-h-[calc(100dvh-128px)] md:min-h-[calc(100dvh-64px)] xl:min-h-[calc(100dvh-80px)]">
            {children}
          </div>
          <Footer />
          <Navigation />
        </div>
      </body>
    </html>
  );
}
