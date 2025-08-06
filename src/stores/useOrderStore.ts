import { create } from 'zustand';
import { SizeOption } from '@/constants/options';
import { BASIC_DELIVERY_FEE, DELIVERY_FREE_MIN_PRICE } from '@/constants/money';
import { Cart } from '@/types/cart';
import { Product } from '@/types';

interface OrderStore {
  orderItems: Product[];
  addItem(orderItem: Product): void;
  setOrderItems(orderItems: Product[]): void;
  deleteItem(id: number, options: string): void;
}

const useOrderStore = create<OrderStore>((set) => ({
  orderItems: [],

  addItem: (item) =>
    set((state) => {
      const newItems = [...state.orderItems];
      newItems.push(item);

      return { orderItems: newItems };
    }),

  setOrderItems: (orderItems) => set({ orderItems }),

  deleteItem: (id, option) =>
    set((state) => {
      const newItems = state.orderItems.filter((item) => !(item._id === id && item.extra.size[0].text === option));

      return { orderItems: newItems };
    }),
}));

export default useOrderStore;
