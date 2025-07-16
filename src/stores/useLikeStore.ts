import { create } from 'zustand';

/**
 * 찜하기 상태를 관리하는 Zustand 스토어입니다.
 * @interface LikeStore
 * @property {string[]} likes - 찜한 상품 ID 목록
 * @property {(id: string) => void} addLike - 찜한 상품으로 등록하는 함수
 * @property {(id: string) => void} removeLike - 찜한 상품에서 제거하는 함수
 * @property {(id: string) => boolean} isLiked - 특정 상품 찜한 상태인지 확인하는 함수
 */
interface LikeStore {
  likes: string[];
  addLike(id: string): void;
  removeLike(id: string): void;
  toggleLike(id: string): void;

  isLiked(id: string): boolean;
}

/**
 * 찜하기 상태를 관리하는 Zustand 스토어입니다.
 * @returns {LikeStore} 찜하기 전역 상태 훅
 */
const useLikeStore = create<LikeStore>((set, get) => ({
  likes: [],

  addLike: (id) => {
    set((state) => {
      if (state.likes.includes(id)) return state;

      return { likes: [...state.likes, id] };
    });
  },

  removeLike: (id) => {
    set((state) => {
      if (state.likes.includes(id) === false) return state;

      return { likes: state.likes.filter((likeId) => likeId !== id) };
    });
  },

  isLiked: (id) => {
    return get().likes.includes(id);
  },

  toggleLike: (id) => (get().isLiked(id) ? get().removeLike(id) : get().addLike(id)),
}));

export default useLikeStore;
