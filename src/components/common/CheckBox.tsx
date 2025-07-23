interface CheckBoxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  name: string;
  label: string;
  highlight?: boolean;
  fontSize?: 'xs' | 'sm' | 'md';
  hideLabel?: boolean;
}

/**
 * 체크박스 컴포넌트입니다.
 *
 * @param {string} id - 체크박스의 id 속성 (label의 for와 연결)
 * @param {string} name - 폼 제출 시 사용되는 name 속성
 * @param {string} label - 체크박스 옆에 표시될 텍스트 라벨
 * @param {string} hightlight - 체크박스 옆에 표시될 텍스트 라벨의 색상을 붉은색으로 강조
 * @param {string} [fontSize=md] - 사이즈 (xs-12, sm-14 md-16)
 * @param {boolean} [hideLabel=false] - true일 경우 라벨은 시각적으로 숨김 처리 (접근성 유지)
 * @param {React.InputHTMLAttributes<HTMLInputElement>} rest - 기본 input 속성 (onClick 등)
 */
function CheckBox({ id, name, label, highlight = false, fontSize = 'md', hideLabel = false, ...rest }: CheckBoxProps) {
  const labelSize = {
    xs: 'text-xs',
    sm: 'text-sm',
    md: 'text-md',
  };

  const checkBoxSize = {
    xs: 'bg-size-[auto_.75rem] w-3 h-3',
    sm: 'bg-size-[auto_.75rem] w-3 h-3',
    md: 'bg-size-[auto_1rem] w-4 h-4',
  };

  return (
    <>
      <div className="flex items-center">
        <input
          type="checkbox"
          id={id}
          name={name}
          value={id}
          className={`appearance-none border-[.0625rem] ${checkBoxSize[fontSize]} checked:bg-[url(/images/icon/check.svg)] bg-no-repeat bg-[center_center] checked:bg- mr-1`}
          {...rest}
        />
        <label
          htmlFor={id}
          className={`${labelSize[fontSize]} ${hideLabel && 'sr-only'} ${highlight ? 'text-error' : ''}`}
        >
          {label}
        </label>
      </div>
    </>
  );
}

export default CheckBox;
