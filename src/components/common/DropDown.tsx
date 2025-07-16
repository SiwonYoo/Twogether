export interface DropDownItemsProps {
  value: string;
  text: string;
}

interface DropDownProps {
  id: string;
  items: DropDownItemsProps[];
  label: string;
  hideLabel?: boolean;
  placeHolder?: string;
  flex?: 'row' | 'col';
}

function DropDown({ id, items, label, hideLabel = false, placeHolder, flex = 'col' }: DropDownProps) {
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
