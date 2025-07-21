import { Judson } from 'next/font/google'; // 구글 폰트 사용
import Image from 'next/image';

const JudsonFont = Judson({
  subsets: ['latin'],
  weight: '700',
});

export default function Details() {
  const topData = {
    headers: ['상의', '앞총장', '어깨', '가슴', '밑단', '소매장', '암홀'],
    values: ['FREE(cm)', '67', '45', '53.5', '60', '48.5', '20'],
  };

  const bottomData = {
    headers: ['하의', '앞총장', '허리', '힙', '허벅지', '밑위(앞/뒤)', '밑단'],
    values: ['FREE(cm)', '93.5', '31', '53', '32.5', '29.5/43', '24'],
  };

  const fabricInfo = [
    { label: '두께감', values: ['얇음', '중간', '다소두꺼움'], selected: '다소두꺼움' },
    { label: '비침여부', values: ['비침없음', '약간비침', '비침'], selected: '비침없음' },
    { label: '신축성', values: ['없음', '약간있음', '많음'], selected: '많음' },
    { label: '기모', values: ['없음', '안쪽면', '겉면', '양면'], selected: '양면' },
    { label: '가슴패드', values: ['없음', '있음'], selected: '없음' },
  ];

  const washingInfo = [
    { label: '미온수 세탁 및 약하게 단독 세탁', _values: 1 },
    { label: '건조기 사용 금지, 형태가 변형될 수 있음', _values: 2 },
    { label: '짙은 색상은 물 빠짐 주의, 밝은 색상과 분리 세탁', _values: 3 },
    { label: '옷걸이에 널어 그늘에 건조, 진한 색상의 경우 즉시 건조', _values: 4 },
    { label: '염소 및 표백제 사용 금지, 변색될 수 있음', _values: 5 },
    { label: '취급 부주의로 인한 오염은 보상 불가', _values: 6 },
  ];

  const renderLayout = (data: { headers: string[]; values: string[] }) => (
    <ul className={`grid grid-cols-7 gap-2 mb-4 bg-(--color-gray-150) p-2`}>
      {data.headers.map((header, idx) => (
        <li key={`header-${idx}`} className="font-semibold text-center">
          {header}
        </li>
      ))}
      {data.values.map((value, idx) => (
        <li key={`value-${idx}`} className="text-center">
          {value}
        </li>
      ))}
    </ul>
  );

  const renderFabricInfo = () => (
    <div className="grid gap-4">
      {fabricInfo.map((item, idx) => (
        <div key={idx} className="grid grid-cols-5">
          <div className="w-[5rem]">{item.label}</div>
          {item.values.map((v, vIdx) => (
            <div
              key={vIdx}
              className={`text-center px-2 py-1 rounded ${
                v === item.selected ? 'bg-(--color-primary) text-white' : ''
              }`}
            >
              {v}
            </div>
          ))}
        </div>
      ))}
    </div>
  );

  const washingInfoLayout = () => {
    return (
      <ul className="grid grid-cols-3 gap-4">
        {washingInfo.map((item) => {
          return (
            <li key={item._values} className="flex flex-col justify-center items-center text-center">
              <Image
                src={`/images/washing_info/washing_info_${item._values}.png`}
                alt={item.label}
                width="104"
                height="104"
              />

              <p className="text-wrap">{item.label}</p>
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <>
      {/* 사이즈 안내 시작 */}
      <div>
        <h2 className={`${JudsonFont.className} text-2xl mb-4`}>Size Info</h2>
        <div>
          {renderLayout(topData)}
          {renderLayout(bottomData)}
        </div>
      </div>
      {/* 사이즈 안내 종료 */}

      {/* 원단 안내 시작 */}
      <div className=" my-4">
        <h2 className={`${JudsonFont.className} text-2xl mb-4`}>Fabric Info</h2>
        <div>{renderFabricInfo()}</div>
      </div>
      {/* 원단 안내 종료 */}

      {/* 세탁 안내 시작 */}
      <div>
        <h2 className={`${JudsonFont.className} text-2xl mb-4`}>Washing Info</h2>
        <div>{washingInfoLayout()}</div>
      </div>
      {/* 세탁 안내 종료 */}
    </>
  );
}
