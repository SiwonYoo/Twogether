'use client';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  name?: string;
  hideLabel?: boolean;
}

/**
 * Input 컴포넌트입니다.
 *
 * @param {string} id - input 요소의 고유 id (label과 연결)
 * @param {string} [label] - 입력 필드 위에 표시될 라벨 텍스트
 * @param {string} name - form 데이터 전송 시 key 이름 (명시하지 않으면 id 값이 들어감)
 * @param {boolean} [hideLabel='false'] - 라벨 표시 여부
 * @param {boolean} [children]
 * @param {React.InputHTMLAttributes<HTMLInputElement>} rest - 기타 input 속성들 (placeholder, value 등)
 */
function Input({ id, label, name, hideLabel = false, children, ...rest }: InputProps) {
  return (
    <div>
      <label htmlFor={id} className={`${hideLabel && 'sr-only'}`}>
        {label}
      </label>
      <div className="flex gap-2 items-center">
        <input
          id={id}
          name={name ?? id}
          className="w-full flex-1 p-2 border-b-[.0625rem] border-b-gray-250 focus:outline-none focus:border-primary focus:border-b-2 "
          {...rest}
        />
        {children}
      </div>
    </div>
  );
}

export default Input;
