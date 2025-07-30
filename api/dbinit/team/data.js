import dayjs from 'dayjs';

function getTime(day = 0, second = 0) {
  return dayjs().add(day, 'days').add(second, 'seconds').format('YYYY.MM.DD HH:mm:ss');
}

export const initData = async (clientId, nextSeq) => {
  return {
    // 회원
    user: [
      {
        _id: await nextSeq('user'),
        email: 'ksyksy@naver.com',
        password: '$2b$10$S.8GNMDyvUF0xzujPtHBu.j5gtS19.OhRmYbpJBnCHg2S83WLx1T2',
        name: '구성연',
        phone: '01011112222',
        address: '서울시 강남구 역삼동 123',
        type: 'admin',
        loginType: 'email',
        image: `/files/${clientId}/user-muzi.png`,
        createdAt: getTime(-100, -60 * 60 * 3),
        updatedAt: getTime(-100, -60 * 60 * 3),
        extra: {
          birthday: '03-23',
        },
      },
      {
        _id: await nextSeq('user'),
        email: 'kjskjs@naver.com',
        password: '$2b$10$S.8GNMDyvUF0xzujPtHBu.j5gtS19.OhRmYbpJBnCHg2S83WLx1T2',
        name: '김준성',
        phone: '01022223333',
        address: '서울시 강남구 삼성동 456',
        type: 'seller',
        loginType: 'email',
        image: `/files/${clientId}/user-neo.png`,
        createdAt: getTime(-50),
        updatedAt: getTime(-30, -60 * 60 * 3),
        extra: {
          birthday: '11-23',
        },
      },
      {
        _id: await nextSeq('user'),
        email: 'yswysw@naver.com',
        password: '$2b$10$S.8GNMDyvUF0xzujPtHBu.j5gtS19.OhRmYbpJBnCHg2S83WLx1T2',
        name: '유시원',
        phone: '01022223333',
        address: '서울시 강남구 삼성동 456',
        type: 'seller',
        loginType: 'email',
        image: `/files/${clientId}/user-neo.png`,
        createdAt: getTime(-50),
        updatedAt: getTime(-30, -60 * 60 * 3),
        extra: {
          birthday: '11-23',
        },
      },
      {
        _id: await nextSeq('user'),
        email: 'csjcsj@naver.com',
        password: '$2b$10$S.8GNMDyvUF0xzujPtHBu.j5gtS19.OhRmYbpJBnCHg2S83WLx1T2',
        name: '최승진',
        phone: '01022223333',
        address: '서울시 강남구 삼성동 456',
        type: 'seller',
        loginType: 'email',
        image: `/files/${clientId}/user-neo.png`,
        createdAt: getTime(-50),
        updatedAt: getTime(-30, -60 * 60 * 3),
        extra: {
          birthday: '11-23',
        },
      },
    ],

    // 상품
    product: [
      {
        _id: await nextSeq('product'),
        seller_id: 1,
        price: 12000,
        shippingFees: 2500,
        show: true,
        active: true,
        name: '뉴라오 스크런치 다크오렌지 (32수)',
        quantity: 2e24,
        buyQuantity: 198,
        mainImages: [
          {
            _id: 1,
            path: '/files/febc13-final02-emjf/model-1.jpg',
            name: 'model-1.jpg',
            originalname: '뉴라오 스크런치 다크오렌지 (32수).jpg',
          },
        ],
        content:
          '32수 슬럽평직 원단을 사용하여 눈에 보이는 원단감이 부드럽고 피부에 닿는 촉감이 부드러우며 쾌적하고 편한한 착용감을 유지해줍니다',
        createdAt: getTime(-41, -60 * 60 * 2),
        updatedAt: getTime(-41, -60 * 60 * 2),
        extra: {
          isBest: true,
          isSale: false,
          category: 'acc',
          isLike: false,
          size: [
            {
              value: 'FREE',
              text: 'FREE',
            },
          ],
          SizeInfo: [
            {
              headers: ['스크런치', '외경'],
              values: ['FREE(cm)', '20'],
            },
          ],
          FabricInfo: [
            {
              label: '두께감',
              values: ['얇음', '중간', '다소두꺼움'],
              selected: ['얇음'],
            },
            {
              label: '원단',
              values: ['면', '폴리에스테르', '코마사'],
              selected: ['면'],
            },
          ],
          washingInfo: [
            {
              _id: 1,
              label: '미온수 세탁 및 약하게 단독 세탁',
            },
            {
              _id: 2,
              label: '건조기 사용 금지, 형태가 변형될 수 있음',
            },
            {
              _id: 3,
              label: '짙은 색상은 물 빠짐이 있을 수 있으니 밝은 색상과 분리 세탁',
            },
            {
              _id: 4,
              label: '옷걸이에 걸어 그늘에 건조, 진한 색상의 경우 세탁 후 즉시 탈수 및 건조',
            },
            {
              _id: 5,
              label: '염소 및 표백제 사용 금지, 변색될 수 있음',
            },
            {
              _id: 6,
              label: '취급 부주의로 인한 탈색 및 오염, 형태 변질 및 수축된 제품은 보상 불가',
            },
          ],
        },
      },
      {
        _id: await nextSeq('product'),
        seller_id: 1,
        price: 4900,
        shippingFees: 3000,
        show: true,
        active: true,
        name: '미니 스트라이프 스크런치',
        quantity: 2e24,
        buyQuantity: 0,
        createdAt: getTime(-16, -60 * 60 * 3),
        updatedAt: getTime(-15, -60 * 45),
        mainImages: [
          {
            _id: 1,
            path: '/files/febc13-final02-emjf/model-1.jpg',
            name: 'model-1.jpg',
            originalname: '미니 스트라이프 스크런치.jpg',
          },
        ],
        content: '파자마뿐만 아니라 일상복에서도 함게 매치학 좋은 스크런치, 부드러운 면 재질로 촉감 좋은 스크런치',
        extra: {
          isBest: false,
          isSale: true,
          category: 'acc',
          isLike: false,
          size: [
            {
              value: 'FREE',
              text: 'FREE',
            },
          ],
          SizeInfo: [
            {
              headers: ['스크런치', '외경'],
              values: ['FREE(cm)', '20'],
            },
          ],
          FabricInfo: [
            {
              label: '두께감',
              values: ['얇음', '중간', '다소두꺼움'],
              selected: ['얇음'],
            },
            {
              label: '원단',
              values: ['면', '폴리에스테르', '코마사'],
              selected: ['면', '폴리에스테르'],
            },
          ],
          washingInfo: [
            {
              _id: 1,
              label: '미온수 세탁 및 약하게 단독 세탁',
            },
            {
              _id: 2,
              label: '건조기 사용 금지, 형태가 변형될 수 있음',
            },
            {
              _id: 3,
              label: '짙은 색상은 물 빠짐이 있을 수 있으니 밝은 색상과 분리 세탁',
            },
            {
              _id: 4,
              label: '옷걸이에 걸어 그늘에 건조, 진한 색상의 경우 세탁 후 즉시 탈수 및 건조',
            },
            {
              _id: 5,
              label: '염소 및 표백제 사용 금지, 변색될 수 있음',
            },
            {
              _id: 6,
              label: '취급 부주의로 인한 탈색 및 오염, 형태 변질 및 수축된 제품은 보상 불가',
            },
          ],
        },
      },
      {
        _id: await nextSeq('product'),
        seller_id: 1,
        price: 3000,
        shippingFees: 3000,
        show: true,
        active: true,
        name: '푸엘라 로고 크루삭스',
        quantity: 2e24,
        buyQuantity: 1,
        createdAt: getTime(-16, -60 * 60 * 3),
        updatedAt: getTime(-15, -60 * 45),
        mainImages: [
          {
            _id: 1,
            path: '/files/febc13-final02-emjf/sample-diver.jpg',
            name: 'sample-diver.jpg',
            originalname: '헬로카봇.jpg',
          },
        ],
        content:
          '코마사를 이용한 최상급 원단의 양말, 베이직한 기본 디자인에 Twogether의 색을 더해 특별함을 더했습니다, 크루삭스로 제작되어 짧지 않고 롱한 기장감의 양말로 발목이 예뻐보이게 만들어줍니다,최상급 코마사를 이용해 오래 신어도 변형이나 망가짐 없이 처음 그대로의 형태를 유지하고 발목으로 편안하게 잡아줘 오래 신어도 편하게 착용할 수 있습니다.',
        extra: {
          isBest: true,
          isSale: true,
          salePrice: 1500,
          category: 'acc',
          isLike: true,
          size: [
            {
              value: 'FREE',
              text: 'FREE',
            },
          ],
          SizeInfo: [
            {
              headers: ['간편사이즈', '발사이즈'],
              values: ['FREE(mm)', '230~265'],
            },
          ],
          FabricInfo: [
            {
              label: '두께감',
              values: ['얇음', '중간', '다소두꺼움'],
              selected: ['얇음'],
            },
            {
              label: '원단',
              values: ['면', '폴리에스테르', '코마사'],
              selected: ['코마사'],
            },
          ],
          washingInfo: [
            {
              _id: 1,
              label: '중성세제 이용 미온수 세탁',
            },
            {
              _id: 2,
              label: '손세탁 권장',
            },
            {
              _id: 3,
              label: '기계 건조 사용 금지',
            },
            {
              _id: 4,
              label: '단독세탁',
            },
            {
              _id: 5,
              label: '염소계 표백제 사용 금지',
            },
          ],
        },
      },
      {
        _id: await nextSeq('product'),
        seller_id: 1,
        price: 39900,
        shippingFees: 3000,
        show: true,
        active: true,
        name: '델핀 그레이 긴팔 커플 잠옷 세트',
        quantity: 2e24,
        buyQuantity: 92,
        createdAt: getTime(-16, -60 * 60 * 3),
        updatedAt: getTime(-15, -60 * 45),
        mainImages: [
          {
            _id: 1,
            path: '/files/febc13-final02-emjf/model-1.jpg',
            name: 'model-1.jpg',
            originalname: '델핀 그레이 긴팔 커플 잠옷 세트.jpg',
          },
        ],
        content:
          '그레이 바탕에 화이트 세로 스트라이프 패턴 남녀공용으로 편안한 핏 바지 양옆 주머니가 있어 실용성 추가 가볍고 몸에 달라붙지 않아 불편함 최소화',
        extra: {
          isBest: true,
          isSale: false,
          category: 'longSleeve',
          isLike: false,
          size: [
            {
              value: 'FREE',
              text: 'FREE',
            },
          ],
          SizeInfo: [
            {
              headers: ['TOP', '어깨', '가슴', '밑단', '팔길이', '총기장'],
              values: ['L', '45.5', '57', '57', '57', '73'],
            },
            {
              headers: ['BOTTOM', '허리', '엉덩이', '밑위', '밑단', '총기장'],
              values: ['L', '31~', '54.5', '31', '32', '96'],
            },
          ],
          FabricInfo: [
            {
              label: '두께감',
              values: ['얇음', '중간', '다소두꺼움'],
              selected: ['중간'],
            },
            {
              label: '신축성',
              values: ['없음', '약간있음', '많음'],
              selected: ['많음'],
            },
          ],
          washingInfo: [
            {
              _id: 1,
              label: '중성세제 이용 미온수 세탁',
            },
            {
              _id: 2,
              label: '손세탁 권장',
            },
            {
              _id: 3,
              label: '기계 건조 사용 금지',
            },
            {
              _id: 4,
              label: '단독세탁',
            },
          ],
        },
      },
      {
        _id: await nextSeq('product'),
        seller_id: 1,
        price: 60100,
        shippingFees: 3000,
        show: true,
        active: true,
        name: '플레인 피치기모 긴팔 상하의 세트(남녀공용)',
        quantity: 2e24,
        buyQuantity: 1,
        createdAt: getTime(-16, -60 * 60 * 3),
        updatedAt: getTime(-15, -60 * 45),
        mainImages: [
          {
            _id: 1,
            path: '/files/febc13-final02-emjf/model-1.jpg',
            name: 'model-1.jpg',
            originalname: '플레인 피치기모 긴팔 상하의 세트(남녀공용).jpg',
          },
        ],
        content:
          '티세르의 첫번째 컬렉션 베이직 실루엣의 스탠다드 파자마로 착용했을 때의 가장 편한 패턴을 연구해 제작된 디자인입니다, 베이직한 디자인에 화이트 파이핑 라인으로 포인트를 주었으며 파이핑 라인과 같은 단추 컬러로 조화로운 디자인을 연출해주었습니다, 얇은 기모 원단으로 봄 가을 겨울 3계절 모두 착용하기 좋은 원단이며 상/하의 주머니를 제작해 실용성과 편의성을 더했습니다',
        extra: {
          isBest: true,
          isSale: true,
          salePrice: 29900,
          category: 'longSleeve',
          isLike: false,
          size: [
            {
              value: 'FREE',
              text: 'FREE',
            },
          ],
          SizeInfo: [
            {
              headers: ['TOP', '어깨', '가슴단면', '밑단단면', '소매길이', '총기장'],
              values: ['FREE', '46', '55', '56', '56', '76'],
            },
            {
              headers: ['BOTTOM', '허리단면', '엉덩이단면', '밑위', '허벅지단면', '총기장'],
              values: ['FREE', '33.5', '53', '35', '32', '98'],
            },
          ],
          FabricInfo: [
            {
              label: '두께감',
              values: ['얇음', '중간', '다소두꺼움'],
              selected: ['중간'],
            },
            {
              label: '신축성',
              values: ['없음', '약간있음', '많음'],
              selected: ['많음'],
            },
            {
              label: '촉감',
              values: ['까칠함', '보통', '부드러움'],
              selected: ['부드러움'],
            },
            {
              label: '사이즈',
              values: ['타이트', '정사이즈', '루즈핏'],
              selected: ['정사이즈'],
            },
            {
              label: '비침여부',
              values: ['비침없음', '약간비침', '비침'],
              selected: ['비침없음'],
            },
            {
              label: '기모',
              values: ['없음', '있음'],
              selected: ['있음'],
            },
          ],
          washingInfo: [
            {
              _id: 1,
              label: '중성세제 이용 미온수 세탁',
            },
            {
              _id: 2,
              label: '손세탁 권장',
            },
            {
              _id: 3,
              label: '기계 건조 사용 금지',
            },
            {
              _id: 4,
              label: '단독세탁',
            },
            {
              _id: 5,
              label: '염소계 표백제 사용 금지',
            },
          ],
        },
      },
      {
        _id: await nextSeq('product'),
        seller_id: 1,
        price: 86000,
        shippingFees: 3000,
        show: true,
        active: true,
        name: '플로이 긴팔 투피스 바이올렛 (피치기모)',
        quantity: 2e24,
        buyQuantity: 2000,
        createdAt: getTime(-16, -60 * 60 * 3),
        updatedAt: getTime(-15, -60 * 45),
        mainImages: [
          {
            _id: 1,
            path: '/files/febc13-final02-emjf/images/product/longSleeve/03/model-1.jpg',
            name: 'model-1.jpg',
            originalname: '플로이 긴팔 투피스 바이올렛 (피치기모).jpg',
          },
        ],
        content:
          '우유 한 방울 떨어뜨린 듯 몽글몽글한 보랏빛 색감에 앞가슴 부분 망레이스 디테일로 넥 라인이 돋보입니다 소매와 밑단 프릴로 전체적인 무드가 사랑스럽게 완성되었고 원단 자체에서 오는 은은하면서 고급스러운 감성이 느껴집니다 다른 원단보다 다소 두께감과 무게감이 있고 신축성이 있는 제품이라 허리밴드가 일반 파자마보다 작습니다 밴딩이라 착용하실 때 무리는 없으나 상세 사이즈 참고 후 구매하시길 바랍니다',
        extra: {
          isBest: true,
          isSale: false,
          salePrice: 86000,
          category: 'longSleeve',
          isLike: false,
          size: [
            {
              value: 'FREE',
              text: 'FREE',
            },
          ],
          SizeInfo: [
            {
              headers: ['TOP', '앞총장', '어깨', '가슴', '밑단', '소매장', '암홀'],
              values: ['FREE', '67', '45', '53.5', '60', '48.5', '20'],
            },
            {
              headers: ['BOTTOM', '앞총장', '허리(밴딩)', '힙', '허벅지', '밑위(앞/뒤)', '밑단'],
              values: ['FREE', '93.5', '31', '53', '32.5', '29.5/43', '24'],
            },
          ],
          FabricInfo: [
            {
              label: '두께감',
              values: ['얇음', '중간', '다소두꺼움'],
              selected: ['다소두꺼움'],
            },
            {
              label: '신축성',
              values: ['없음', '약간있음', '많음'],
              selected: ['많음'],
            },
            {
              label: '촉감',
              values: ['까칠함', '보통', '부드러움'],
              selected: ['부드러움'],
            },
            {
              label: '사이즈',
              values: ['타이트', '정사이즈', '루즈핏'],
              selected: ['정사이즈'],
            },
            {
              label: '비침여부',
              values: ['비침없음', '약간비침', '비침'],
              selected: ['비침없음'],
            },
            {
              label: '기모',
              values: ['없음', '있음'],
              selected: ['있음'],
            },
          ],
          washingInfo: [
            {
              _id: 1,
              label: '중성세제를 사용해 미온수 세탁 및 약하게 단독 세탁',
            },
            {
              _id: 2,
              label: '건조기 사용 금지, 형태가 변형될 수 있음',
            },
            {
              _id: 3,
              label: '짙은 색상은 물 빠짐이 있을 수 있으니 밝은 색상과 분리 세탁',
            },
            {
              _id: 4,
              label: '옷걸이에 걸어 그늘에 건조, 진한 색상의 경우 세탁 후 즉시 탈수 및 건조',
            },
            {
              _id: 5,
              label: '염소 및 표백제 사용 금지, 변색될 수 있음',
            },
            {
              _id: 6,
              label: '취급 부주의로 인한 탈색 및 오염, 형태 변질 및 수축된 제품은 보상이 불가능하오니 주의 요망',
            },
          ],
        },
      },
    ],

    // 주문
    order: [],

    // 후기
    review: [],

    // 장바구니
    cart: [],

    // 즐겨찾기/북마크
    bookmark: [],

    // QnA, 공지사항 등의 게시판
    post: [],

    // 코드
    code: [
      {
        _id: 'productCategory',
        title: '상품 카테고리',
        codes: [
          {
            sort: 1,
            code: 'PC01',
            value: 'short-sleeve',
            depth: 1,
          },
          {
            sort: 2,
            code: 'PC02',
            value: 'long-sleeve',
            depth: 1,
          },
          {
            sort: 3,
            code: 'PC03',
            value: 'robe',
            depth: 1,
          },
          {
            sort: 4,
            code: 'PC04',
            value: 'acc',
            depth: 1,
          },
        ],
      },
      {
        _id: 'orderState',
        title: '주문 상태',
        codes: [
          {
            sort: 1,
            code: 'OS01',
            value: '입금 전',
          },
          {
            sort: 2,
            code: 'OS02',
            value: '준비 중',
          },
          {
            sort: 3,
            code: 'OS03',
            value: '배송 중',
          },
          {
            sort: 4,
            code: 'OS04',
            value: '배송 완료',
          },
        ],
      },
    ],

    // 설정
    config: [],
  };
};
