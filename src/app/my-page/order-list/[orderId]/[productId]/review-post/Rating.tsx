'use client';

import { Star } from 'lucide-react';
import React from 'react';

function Rating({
  selected,
  children,
  inputChange,
}: {
  selected: number | null;
  children: React.ReactElement;
  inputChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}) {
  return (
    <fieldset className="my-6">
      <legend className="mb-1">별점</legend>
      {children}
      <div className="flex gap-1">
        <label>
          <Star color="#2E1F42" fill={selected && selected > 0 ? '#2E1F42' : '#eeeeee'} />
          <input
            type="radio"
            name="rating"
            value={1}
            className="sr-only"
            aria-label="1점"
            checked={selected === 1}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              inputChange(event);
            }}
          />
        </label>
        <label>
          <Star color="#2E1F42" fill={selected && selected > 1 ? '#2E1F42' : '#eeeeee'} />
          <input
            type="radio"
            name="rating"
            value={2}
            className="sr-only"
            aria-label="2점"
            checked={selected === 2}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              inputChange(event);
            }}
          />
        </label>
        <label>
          <Star color="#2E1F42" fill={selected && selected > 2 ? '#2E1F42' : '#eeeeee'} />
          <input
            type="radio"
            name="rating"
            value={3}
            className="sr-only"
            aria-label="3점"
            checked={selected === 3}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              inputChange(event);
            }}
          />
        </label>
        <label>
          <Star color="#2E1F42" fill={selected && selected > 3 ? '#2E1F42' : '#eeeeee'} />
          <input
            type="radio"
            name="rating"
            value={4}
            className="sr-only"
            aria-label="4점"
            checked={selected === 4}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              inputChange(event);
            }}
          />
        </label>
        <label>
          <Star color="#2E1F42" fill={selected && selected > 4 ? '#2E1F42' : '#eeeeee'} />
          <input
            type="radio"
            name="rating"
            value={5}
            className="sr-only"
            aria-label="5점"
            checked={selected === 5}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              inputChange(event);
            }}
          />
        </label>
      </div>
    </fieldset>
  );
}

export default Rating;
