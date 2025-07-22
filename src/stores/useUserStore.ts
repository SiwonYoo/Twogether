import { User } from '@/types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/**
 * 사용자 정보를 나타내는 인터페이스입니다.
 * @interface UserInfo
 * @property {string} id - 사용자 ID
 * @property {string} name - 사용자 이름
 * @property {string} email - 사용자 이메일
 */
// interface UserInfo {
//   id: string;
//   name: string;
//   email: string;
// }

/**
 * 사용자 상태를 관리하는 Zustand 스토어입니다.
 * @interface UserStore
 * @property {UserInfo | null} user - 로그인한 사용자 정보
 * @property {boolean} isLoggedIn - 로그인 상태 여부
 * @property {(user: UserInfo) => void} login - 로그인(사용자 등록) 함수
 * @property {() => void} logout - 로그아웃(사용자 등록 해제) 함수
 */
interface UserStore {
  user: User | null; // 확인 UserInfo -> User
  isLoggedIn: boolean;
  login(user: User): void;
  logout(): void;
}

/**
 * 사용자의 로그인 상태를 관리하는 Zustand 스토어입니다.
 * @returns {UserStore} 사용자 전역 상태 훅
 */
const useUserStore = create(
  persist<UserStore>(
    (set, get) => ({
      // 상태값 초기화
      user: null,
      isLoggedIn: false,

      // 상태 변경 함수
      login: (user) => {
        set({ user, isLoggedIn: true });
      },

      logout: () => {
        set({ user: null, isLoggedIn: false });
      },
    }),
    {
      name: 'user', // 스토리지에 저장될 key 이름
    }
  )
);

export default useUserStore;
