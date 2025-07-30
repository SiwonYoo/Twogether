import ProductCardItem from '@/components/product/ProductCardItem';
import { getProducts } from '@/data/functions/shop';

interface ProductMainPageProps {
  category: string;
}

export default async function ProductMainPage({ category }: ProductMainPageProps) {
  let customQuery = '';

  if (category === 'best') {
    customQuery = encodeURIComponent(JSON.stringify({ 'extra.isBest': true }));
  } else if (category === 'sale') {
    customQuery = encodeURIComponent(JSON.stringify({ 'extra.isSale': true }));
  } else {
    return null;
  }

  const data = await getProducts(customQuery);

  if (data.ok === 0 || !data.item || data.item.length === 0) {
    return null;
  }

  return (
    <>
      {data.item.slice(0, 2).map((item) => (
        <ProductCardItem key={item._id} productType={category} data={[item]} />
      ))}
    </>
  );
}
