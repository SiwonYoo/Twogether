import ProductCardItem from '@/components/product/ProductCardItem';
import { getProducts } from '@/data/functions/shop';
import { Product } from '@/types';

interface ProductMainPageProps {
  category: string;
}

export default async function ProductMainPage({ category }: ProductMainPageProps) {
  let customQuery = '';

  if (category === 'best') {
    customQuery = encodeURIComponent(JSON.stringify({ 'extra.isBest': true }));
  } else if (category === 'sale') {
    customQuery = encodeURIComponent(JSON.stringify({ 'extra.isSale': true }));
  } else if (category === 'all') {
    customQuery = encodeURIComponent(JSON.stringify({}));
  } else {
    return null;
  }

  const data = await getProducts(customQuery);

  if (data.ok === 0 || !data.item || data.item.length === 0) {
    return null;
  }
  console.log(data);

  // best, sale 상품을 렌덤으로 보여줌
  function shuffleArray(array: Product[]): Product[] {
    return [...array].sort(() => Math.random() - 0.5);
  }

  const shuffled = shuffleArray(data.item);
  let selected;
  if (category === 'all') selected = shuffled.slice(0, 12);
  else selected = shuffled.slice(0, 2);

  return (
    <>
      {selected.map((item) => (
        <ProductCardItem key={item._id} productType={category} data={[item]} autoplay={category !== 'all'} />
      ))}
    </>
  );
}
