'use client';

import { useState } from 'react';

export interface RadioItem {
  value: string;
  label: string;
}

interface RadioProps extends React.InputHTMLAttributes<HTMLInputElement> {
  legend: string;
  name: string;
  options: RadioItem[];
  selected?: string;
}

function Radio({ legend, name, options, selected, ...rest }: RadioProps) {
  const [isChecked, setChecked] = useState(selected || '');

  return (
    <fieldset className="my-6">
      <legend className="mb-1">{legend}</legend>
      {options.map((item) => (
        <label
          key={item.value}
          className={`inline-block px-6 py-2 m-1 rounded-full text-sm cursor-pointer border-[.0625rem] border-primary ${
            isChecked === item.value ? 'bg-primary text-white' : 'bg-white text-primary'
          }`}
        >
          <input
            type="radio"
            name={name}
            value={item.value}
            checked={isChecked === item.value}
            onChange={() => {
              setChecked(item.value);
            }}
            className="hidden"
            {...rest}
          />
          {item.label}
        </label>
      ))}
    </fieldset>
  );
}

export default Radio;
