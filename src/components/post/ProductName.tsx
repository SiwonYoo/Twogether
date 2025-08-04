// components/ProductName.tsx
'use client';

import { useEffect, useState } from 'react';
import { getAllProducts } from '@/data/functions/shop';
import Link from 'next/link';

export default function ProductName({ productId }: { productId: number }) {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProduct() {
      const res = await getAllProducts();
      if (!res.ok) {
        setError(res.message);
        return;
      }
      const product = res.item.find((p) => p._id === productId);
      const productType = res.item.find((p) => p.extra.category);
      setName(product?.name ?? '상품명을 찾을 수 없습니다.');
      setType(productType?.extra.category ?? '');
    }
    fetchProduct();
  }, [productId]);

  if (error) return <p className="text-primary">{error}</p>;

  return (
    <div className="flex items-center gap-4 h-25 p-4 bg-gray-150">
      <Link href={`/shop/${type}/${productId}`}>
        <p>
          <strong>문의상품: </strong>
          {name}
        </p>
      </Link>
    </div>
  );
}
