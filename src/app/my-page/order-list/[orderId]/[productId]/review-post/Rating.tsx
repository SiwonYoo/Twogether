'use client';

import { Star } from 'lucide-react';
import React, { useState } from 'react';

function Rating({ selected, children }: { selected?: number; children: React.ReactElement }) {
  const [isChecked, setChecked] = useState(selected || 0);

  return (
    <fieldset className="my-6">
      <legend className="mb-1">별점</legend>
      {children}
      <div className="flex gap-1">
        <label>
          <Star color="#2E1F42" fill={isChecked > 0 ? '#2E1F42' : '#eeeeee'} />
          <input
            type="radio"
            name="rating"
            value={1}
            className="sr-only"
            aria-label="1점"
            checked={isChecked === 1}
            onChange={() => {
              setChecked(1);
            }}
          />
        </label>
        <label>
          <Star color="#2E1F42" fill={isChecked > 1 ? '#2E1F42' : '#eeeeee'} />
          <input
            type="radio"
            name="rating"
            value={2}
            className="sr-only"
            aria-label="2점"
            checked={isChecked === 2}
            onChange={() => {
              setChecked(2);
            }}
          />
        </label>
        <label>
          <Star color="#2E1F42" fill={isChecked > 2 ? '#2E1F42' : '#eeeeee'} />
          <input
            type="radio"
            name="rating"
            value={3}
            className="sr-only"
            aria-label="3점"
            checked={isChecked === 3}
            onChange={() => {
              setChecked(3);
            }}
          />
        </label>
        <label>
          <Star color="#2E1F42" fill={isChecked > 3 ? '#2E1F42' : '#eeeeee'} />
          <input
            type="radio"
            name="rating"
            value={4}
            className="sr-only"
            aria-label="4점"
            checked={isChecked === 4}
            onChange={() => {
              setChecked(4);
            }}
          />
        </label>
        <label>
          <Star color="#2E1F42" fill={isChecked > 4 ? '#2E1F42' : '#eeeeee'} />
          <input
            type="radio"
            name="rating"
            value={5}
            className="sr-only"
            aria-label="5점"
            checked={isChecked === 5}
            onChange={() => {
              setChecked(5);
            }}
          />
        </label>
      </div>
    </fieldset>
  );
}

export default Rating;
