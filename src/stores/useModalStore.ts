import { ReactNode } from 'react';
import { create } from 'zustand';

/**
 * 모달 상태를 관리하는 Zustand 스토어입니다.
 * @interface ModalStore
 * @property {boolean} isOpen - 모달이 열려 있는지 여부
 * @property {ReactNode | null} content - 모달에 표시할 내용 컴포넌트
 * @property {(content: React.ReactNode) => void} openModal - 모달 여는 함수. content를 인자로 받아 모달을 열고 해당 내용을 설정
 * @property {() => void} closeModal - 모달 닫는 함수
 */
interface ModalStore {
  isOpen: boolean;
  // ReactNode, ReactElement 중에 뭘 쓸지... 고민
  content: ReactNode | null;
  openModal(content: React.ReactNode): void;
  closeModal(): void;
}

/**
 * Dialog 모달의 상태를 관리하는 Zustand 스토어입니다.
 * @returns {ModalStore} 모달 전역 상태 훅
 */
const useModalStore = create<ModalStore>((set) => ({
  isOpen: false,
  content: null,

  openModal: (content) => set({ isOpen: true, content }),

  closeModal: () => set({ isOpen: false, content: null }),
}));

export default useModalStore;
