import { create } from 'zustand';
import { SizeOption } from '@/constants/options';
import { BASIC_DELIVERY_FEE, DELIVERY_FREE_MIN_PRICE } from '@/constants/money';
import { Cart } from '@/types/cart';

interface CartStore {
  items: Cart[];
  checkedIds: number[];
  totalPrice: number;
  deliveryFee: number;
  addItem(item: Cart): void;
  setItems(items: Cart[]): void;
  deleteItem(id: number, options: string): void;
  deleteItemByCartId(id: number): void;
  updateQuantity(id: number, option: string, quantity: number): void;
  setCheckedIds(selectedCartIds: number[]): void;
}

/**
 * 장바구니 상태를 관리하는 Zustand 스토어입니다.
 * @returns {CartStore} 장바구니 전역 상태 훅
 */
const useCartStore = create<CartStore>((set) => ({
  items: [],
  checkedIds: [],
  totalPrice: 0,
  deliveryFee: 3000,

  addItem: (item) =>
    set((state) => {
      const newItems = [...state.items];
      let isFound = false;

      // 장바구니에 같은 상품(id, 옵션 동일)이 있으면 수량만 증가
      for (let i = 0; i < newItems.length; i++) {
        if (newItems[i].product_id === item.product_id && newItems[i].product.extra.size === item.product.extra.size) {
          newItems[i].quantity += item.quantity;
          isFound = true;
          break;
        }
      }

      // 같은 상품이 없으면 새로 추가
      if (!isFound) {
        newItems.push(item);
      }

      return { items: newItems };
    }),

  setItems: (items) => set({ items }),

  deleteItem: (id, option) =>
    set((state) => {
      const newItems = state.items.filter(
        (item) => !(item.product_id === id && item.product.extra.size[0].text === option)
      );

      return { items: newItems };
    }),

  deleteItemByCartId: (id) =>
    set((state) => {
      const newItems = state.items.filter((item) => !(item._id === id));

      return { items: newItems };
    }),

  updateQuantity: (id, option, quantity) =>
    set((state) => {
      const updatedItems = state.items.map((item) =>
        item.product_id === id && item.product.extra.size[0].text === option ? { ...item, quantity } : item
      );

      return {
        items: updatedItems,
      };
    }),

  setCheckedIds: (checkedIds) => set({ checkedIds }),
}));

export default useCartStore;
