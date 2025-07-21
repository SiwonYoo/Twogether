import { SelectHTMLAttributes } from 'react';

export interface DropDownItemsProps {
  value: string;
  text: string;
}

interface DropDownProps extends SelectHTMLAttributes<HTMLSelectElement> {
  id: string;
  items: DropDownItemsProps[];
  label: string;
  hideLabel?: boolean;
  placeHolder?: string;
  flex?: 'row' | 'col';
}

/**
 * 드롭다운(Select) 컴포넌트입니다.
 *
 * @param {string} id - select 요소의 id 값
 * @param {DropDownItemsProps[]} items - 드롭다운 항목 목록 (value와 표시 텍스트)
 * @param {string} label - 드롭다운 라벨 텍스트
 * @param {boolean} [hideLabel=false] - 라벨을 시각적으로 숨길지 여부 (접근성 유지)
 * @param {string} [placeHolder] - placeholder 역할을 하는 숨김 옵션 텍스트
 * @param {'row' | 'col'} [flex='col'] - 라벨과 드롭다운의 flex 방향 ('row' 또는 'col')
 * @param {SelectHTMLAttributes<HTMLSelectElement>} rest - 기타 select 엘리먼트 속성들
 */
function DropDown({ id, items, label, hideLabel = false, placeHolder, flex = 'col', ...rest }: DropDownProps) {
  const list = items.map((item) => (
    <option value={item.value} key={item.value}>
      {item.text}
    </option>
  ));

  const flexDirection = {
    row: 'flex-row',
    col: 'flex-col',
  };

  return (
    <>
      <div className={`flex gap-1 ${flexDirection[flex]} ${hideLabel && 'sr-only'}`}>
        <label htmlFor={id}>{label}</label>
        <select
          name={id}
          id={id}
          className="flex-1 w-full p-2 border-[.0625rem] border-gray-250 rounded-md appearance-none bg-[url(/images/icon/dropdown.svg)] bg-no-repeat bg-position-[center_right_0.5rem] focus:outline-none focus:border-primary focus:border-2 focus:rounded-md"
          {...rest}
        >
          {placeHolder && (
            <option value="" hidden className="text-gray-150">
              {placeHolder}
            </option>
          )}
          {list}
        </select>
      </div>
    </>
  );
}

export default DropDown;
