import ProductTypeLayout from '@/app/shop/ProductTypeLayout';

export default function ShopLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <ProductTypeLayout />
      <main className="mx-4 mb-4 relative">
        <>{children}</>
      </main>
    </>
  );
}
