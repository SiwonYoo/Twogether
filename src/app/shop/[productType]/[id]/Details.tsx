import { ProductDetails } from '@/types/product';
import { Judson } from 'next/font/google'; // 구글 폰트 사용
import Image from 'next/image';
const JudsonFont = Judson({
  subsets: ['latin'],
  weight: '700',
});

export default function DetailsPage({ product }: ProductDetails) {
  const defaultSizeLayout = () => {
    return product.extra.SizeInfo.map((size, sizeIdx) => {
      const colCount = size.headers.length;
      return (
        <ul
          key={sizeIdx}
          style={{ gridTemplateColumns: `repeat(${colCount}, minmax(0, 1fr))` }}
          className="grid items-center mb-4 bg-(--color-gray-150) p-1"
        >
          {size.headers.map((header, hIdx) => (
            <li key={`h-${sizeIdx}-${hIdx}`} className="text-center p-2 font-bold">
              {header}
            </li>
          ))}
          {size.values.map((value, vIdx) => (
            <li key={`v-${sizeIdx}-${vIdx}`} className="text-center p-2">
              {value}
            </li>
          ))}
        </ul>
      );
    });
  };

  const fabricLayout = () => {
    return product.extra.FabricInfo.map((fabric, i) => {
      // headers 대신 values.length + 1 만큼 칸을 만든다
      return (
        <ul
          key={i}
          style={{
            gridTemplateColumns: `5rem repeat(${fabric.values.length}, minmax(0, 1fr))`,
          }}
          className="grid gap-2 mb-4 items-center"
        >
          {/* 레이블 칸 */}
          <li className="font-bold w-[4rem]">{fabric.label}</li>

          {/* 값 칸들 */}
          {fabric.values.map((v, vi) => {
            const isSel = fabric.selected.includes(v);
            return (
              <li
                key={vi}
                className={`text-center py-1 rounded ${
                  isSel ? 'bg-(--color-primary) text-white' : 'bg-[--color-gray-150]'
                }`}
              >
                {v}
              </li>
            );
          })}
        </ul>
      );
    });
  };

  const washingLayout = () => {
    return (
      <ul className="grid grid-cols-3 text-center  bg-(--color-gray-150) rounded">
        {product.extra.washingInfo.map((info) => (
          <li key={info._id} className="flex justify-between flex-col items-center px-4 py-2">
            <p className="w-[4rem] py-2">
              <Image
                src={`/images/washing_info/washing_info_${info._id}.png`}
                alt={info.label}
                width="64"
                height="64"
                className="h-full object-cover"
              />
            </p>
            {info.label}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <section className="text-[.75rem]">
      {/* 사이즈 안내 시작 */}
      <article>
        <h2 className={`${JudsonFont.className} text-2xl mb-4`}>Size Info</h2>
        <div>{defaultSizeLayout()}</div>
      </article>
      {/* 사이즈 안내 종료 */}

      {/* 원단 안내 시작 */}
      <article className=" my-4">
        <h2 className={`${JudsonFont.className} text-2xl mb-4`}>Fabric Info</h2>
        <div>{fabricLayout()}</div>
      </article>
      {/* 원단 안내 종료 */}

      {/* 세탁 안내 시작 */}
      <article>
        <h2 className={`${JudsonFont.className} text-2xl mb-4`}>Washing Info</h2>
        <div>{washingLayout()}</div>
      </article>
      {/* 세탁 안내 종료 */}
    </section>
  );
}
