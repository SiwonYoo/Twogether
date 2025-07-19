import ProductTypeIdLayout from '@/app/shop/[productType]/[id]/ProductTypeIdLayout';

export default function ProductType({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {children}
      <div>
        <ProductTypeIdLayout />
      </div>
    </>
  );
}
