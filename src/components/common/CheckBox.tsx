interface CheckBoxProps {
  id: string;
  name: string;
  label: string;
  hideLabel?: boolean;
  checked?: boolean;
}

/**
 * 체크박스 컴포넌트입니다.
 *
 * @param {string} id - 체크박스의 id 속성 (label의 for와 연결)
 * @param {string} name - 폼 제출 시 사용되는 name 속성
 * @param {string} label - 체크박스 옆에 표시될 텍스트 라벨
 * @param {boolean} [hideLabel=false] - true일 경우 라벨은 시각적으로 숨김 처리 (접근성 유지)
 * @param {boolean} [checked=false] - 체크박스 기본 선택 여부
 */
function CheckBox({ id, name, label, hideLabel = false, checked = false }: CheckBoxProps) {
  return (
    <>
      <div className="flex items-center">
        <input
          type="checkbox"
          id={id}
          name={name}
          value={id}
          defaultChecked={checked}
          className="appearance-none border-[.0625rem] w-4 h-4 checked:bg-[url(/images/icon/check.svg)] mr-1"
        />
        <label htmlFor={id} className={`${hideLabel && 'sr-only'}`}>
          {label}
        </label>
      </div>
    </>
  );
}

export default CheckBox;
