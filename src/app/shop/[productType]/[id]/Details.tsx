import { ProductDetails } from '@/types/product';
import { Judson } from 'next/font/google'; // 구글 폰트 사용
import Image from 'next/image';
const JudsonFont = Judson({
  subsets: ['latin'],
  weight: '700',
});

export default function DetailsPage({ id, item }: ProductDetails) {
  console.log(item);
  const defaultSizeLayout = () => {
    return item[Number(id)].extra.SizeInfo.map((size, sizeIdx) => {
      const colCount = size.headers.length;
      return (
        <ul
          key={sizeIdx}
          style={{ gridTemplateColumns: `repeat(${colCount}, minmax(0, 1fr))` }}
          className="grid mb-4 bg-(--color-gray-150) p-2"
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
    return item[Number(id)].extra.FabricInfo.map((fabric, i) => {
      // headers 대신 values.length + 1 만큼 칸을 만든다
      return (
        <ul
          key={i}
          style={{
            gridTemplateColumns: `5rem repeat(${fabric.values.length}, minmax(0, 1fr))`,
          }}
          className="grid gap-2 mb-4"
        >
          {/* 레이블 칸 */}
          <li className="font-bold flex items-center">{fabric.label}</li>

          {/* 값 칸들 */}
          {fabric.values.map((v, vi) => {
            const isSel = fabric.selected.includes(v);
            return (
              <li
                key={vi}
                className={`text-center px-2 py-1 rounded ${
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
        {item[Number(id)].extra.washingInfo.map((info) => (
          <li key={info._id} className="flex justify-center flex-col items-center px-4 py-2">
            <Image src={info.imgUrl ? info.imgUrl : ''} alt={info.label} width="100" height="100" />
            {info.label}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <>
      {/* 사이즈 안내 시작 */}
      <div>
        <h2 className={`${JudsonFont.className} text-2xl mb-4`}>Size Info</h2>
        <div>{defaultSizeLayout()}</div>
      </div>
      {/* 사이즈 안내 종료 */}

      {/* 원단 안내 시작 */}
      <div className=" my-4">
        <h2 className={`${JudsonFont.className} text-2xl mb-4`}>Fabric Info</h2>
        <div>{fabricLayout()}</div>
      </div>
      {/* 원단 안내 종료 */}

      {/* 세탁 안내 시작 */}
      <div>
        <h2 className={`${JudsonFont.className} text-2xl mb-4`}>Washing Info</h2>
        <div>{washingLayout()}</div>
      </div>
      {/* 세탁 안내 종료 */}
    </>
  );
}
