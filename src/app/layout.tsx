import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import './globals.css';
import localFont from 'next/font/local';

const pretendard = localFont({
  src: '../../public/font/PretendardVariable.ttf',
  display: 'swap', // 폰트 로딩
  weight: '45 920',
});

import Mainlayout from '@/app/Mainlayout';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`flex flex-col items-center justify-center min-h-screen bg-white ${pretendard.className} `}>
        <div className="flex flex-col relative w-full min-w-[400px] max-w-[768px] min-h-dvh bg-white">
          <Mainlayout />
          <div className="flex-1">{children}</div>
          <Footer />
          <Navigation />
        </div>
      </body>
    </html>
  );
}
