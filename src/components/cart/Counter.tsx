'use client';

/**
 * 카운터용 props
 * quantity : 상위 컴포넌트에서 관리하는 현재 양
 * minQuantity : 카운터에서 설정할 수 있는 최소 수량(방어용) 1로 설정
 * onChange : 수량이 변경될 때 호출할 콜백 함수
 */
interface CounterProps {
  quantity: number;
  minQuantity?: number;
  onChange: (nextQuantity: number) => void;
}

/**
 * Counter 컴포넌트
 *
 * 상위 컴포넌트가 quantity 상태를 가지고 있고 이를 props로 내려줌
 * 버튼 클릭시 onChange에 등록된 함수를 실행
 * => 새로운 수량을 받아 부모 컴포넌트가 상태를 갱신하게됨 => 리렌더링
 */
export default function Counter({ quantity, minQuantity: min = 1, onChange }: CounterProps) {
  const countUp = () => {
    onChange(quantity + 1);
  };

  const countDown = () => {
    if (quantity > min) {
      onChange(quantity - 1);
    }
  };

  return (
    <div className="flex flex-row items-center w-fit h-11 border-1 border-gray-150">
      <button
        type="button"
        aria-label="수량 감소"
        onClick={countDown}
        disabled={quantity <= min}
        className="flex justify-center items-center text-[1.25rem] w-[2.6875rem] border-r-1 border-gray-150 cursor-pointer"
      >
        -
      </button>

      <p className="w-[2.6875rem] text-[1rem] text-center">{quantity}</p>

      <button
        type="button"
        aria-label="수량 증가"
        onClick={countUp}
        className="flex justify-center items-center text-[1.25rem] w-[2.6875rem] border-l-1 border-gray-150 cursor-pointer"
      >
        +
      </button>
    </div>
  );
}
