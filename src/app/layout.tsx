import './globals.css';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="flex items-center justify-center min-h-screen px-4 bg-white">
        <div className="w-full min-w-[400px] max-w-[768px] bg-white">{children}</div>
      </body>
    </html>
  );
}
