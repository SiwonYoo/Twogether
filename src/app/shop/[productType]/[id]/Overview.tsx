import { Product, ProductDetails } from '@/types/product';
import { Judson } from 'next/font/google'; // 구글 폰트 사용
import Image from 'next/image';

const JudsonFont = Judson({
  subsets: ['latin'],
  weight: '700',
});


export default function OverviewPage({ productType, id, item }: ProductDetails) {
  return (
    <>
      <div>
        <h2 className={`${JudsonFont.className} font-bold text-4xl text-center text-(--color-primary)`}>Twogether</h2>
        <p className="text-center my-4">{item[Number(id)].content}</p>
        <Image
          src={`/images/products/${productType}/${id}/model-${item[Number(id)]._id}.jpg`}
          alt={item[Number(id)].content === '' ? `${item[Number(id)].content}` : ''}
          width="1000"
          height="1197"
        />
        <div className="my-6">
          <h3 className="mb-4">{item[Number(id)].name}</h3>
          <p>{item[Number(id)].content}</p>
        </div>
        <Image
          src={`/images/products/${productType}/${id}/model-${item[Number(id)]._id + 1}.jpg`}
          alt={item[Number(id)].content === '' ? `${item[Number(id)].content}` : ''}
          width="1000"
          height="1197"
        />
        <Image
          src={`/images/products/${productType}/${id}/model-${item[Number(id)]._id + 2}.jpg`}
          alt={item[Number(id)].content === '' ? `${item[Number(id)].content}` : ''}
          width="1000"
          height="1197"
        />
        <Image
          src={`/images/products/${productType}/${id}/model-${item[Number(id)]._id + 3}.jpg`}
          alt={item[Number(id)].content === '' ? `${item[Number(id)].content}` : ''}
          width="1000"
          height="1197"
        />
      </div>
    </>
  );
}
