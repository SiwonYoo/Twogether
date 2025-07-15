import './globals.css';
import localFont from 'next/font/local';

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
      <body className={`flex items-center justify-center min-h-screen bg-white px-4 ${pretendard.className}`}>
        <div className="relative w-full min-w-[400px] max-w-[768px] min-h-dvh bg-white">
          {/* <Header /> */}
          {children}
          {/* <Footer /> */}
          {/* <Navigation /> */}
        </div>
      </body>
    </html>
  );
}
