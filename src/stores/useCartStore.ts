import { create } from 'zustand';
import { SizeOption } from '@/constants/options';

/**
 * 장바구니의 상품을 나타내는 인터페이스입니다.
 * @interface CartItem
 * @property {string} id - 상품 ID
 * @property {string} name - 상품 이름
 * @property {number} price - 상품 가격
 * @property {number} quantity - 상품 수량
 */
interface CartItem {
  id: string;
  name: string;
  option: SizeOption;
  price: number;
  quantity: number;
}

/**
 * 장바구니 상태를 관리하는 Zustand 스토어입니다.
 * @interface CartStore
 * @property {CartItem[]} items - 장바구니에 담긴 상품 목록
 * @property {number} totalPrice - 장바구니 총 가격(상품 가격 * 수량의 합계)
 * @property {(item: CartItem) => void} addItem - 장바구니에 상품을 추가하는 함수
 */
interface CartStore {
  items: CartItem[];
  totalPrice: number;
  addItem(item: CartItem): void;
}

/**
 * 장바구니 상태를 관리하는 Zustand 스토어입니다.
 * @returns {CartStore} 장바구니 전역 상태 훅
 */
const useCartStore = create<CartStore>((set) => ({
  items: [],
  totalPrice: 0,

  addItem: (item) =>
    set((state) => {
      const newItems = [...state.items];
      let isFound = false;

      // 장바구니에 같은 상품(id, 옵션 동일)이 있으면 수량만 증가
      for (let i = 0; i < newItems.length; i++) {
        if (newItems[i].id === item.id && newItems[i].option === item.option) {
          newItems[i].quantity += item.quantity;
          isFound = true;
          break;
        }
      }

      // 같은 상품이 없으면 새로 추가
      if (!isFound) {
        newItems.push(item);
      }

      const newTotalPrice = state.totalPrice + item.price * item.quantity;

      return { items: newItems, totalPrice: newTotalPrice };
    }),
}));

export default useCartStore;
