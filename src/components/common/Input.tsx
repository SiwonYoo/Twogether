'use client';

import { Search } from 'lucide-react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  type?: 'text' | 'password' | 'number';
  search?: boolean;
  hideLabel?: boolean;
}

/**
 * Input 컴포넌트입니다.
 *
 * @param {string} id - input 요소의 고유 id (label과 연결)
 * @param {string} [label] - 입력 필드 위에 표시될 라벨 텍스트
 * @param {'text' | 'password' | 'number'} [type='text'] - input 타입
 * @param {boolean} [hideLabel='false'] - 라벨 표시 여부
 * @param {boolean} [search] - 검색 아이콘 표시 여부 (text 타입에서만 적용)
 * @param {React.InputHTMLAttributes<HTMLInputElement>} rest - 기타 input 속성들 (placeholder, value 등)
 */
function Input({ id, label, type = 'text', hideLabel = false, search, ...rest }: InputProps) {
  return (
    <>
      <label htmlFor={id} className={`${hideLabel && 'sr-only'}`}>
        {label}
      </label>
      <div className="flex gap-1 items-center">
        <input
          id={id}
          name={id}
          type={type}
          className="flex-1 p-2 border-b-[.0625rem] border-b-gray-250 focus:outline-none focus:border-primary focus:border-b-2 "
          {...rest}
        />
        {type === 'text' && search ? <Search /> : null}
      </div>
    </>
  );
}

export default Input;
