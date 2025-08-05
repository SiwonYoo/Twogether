import { LikeItem } from '@/types';
import { create } from 'zustand';

interface LikeStore {
  likes: LikeItem[];
  addLike(item: LikeItem): void;
  removeLike(id: number | string): void;
  isLiked(id: number | string): boolean;
  setLikes(items: LikeItem[]): void;
}

const useLikeStore = create<LikeStore>((set, get) => ({
  likes: [],

  addLike: (item) =>
    set((state) => {
      const exists = state.likes.some((l) => String(l._id) === String(item._id));
      if (exists) return state;
      return { likes: [...state.likes, item] };
    }),

  removeLike: (id) => {
    set((state) => ({
      likes: state.likes.filter((l) => String(l._id) !== String(id)),
    }));
  },

  isLiked: (productId) => {
    const likes = get().likes;
    return likes.some((l) => String(l.product?._id) === String(productId));
  },

  setLikes: (items) => set(() => ({ likes: items })),
}));

export default useLikeStore;
