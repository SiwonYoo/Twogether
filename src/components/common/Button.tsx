import { Judson } from 'next/font/google';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  bg?: 'primary' | 'secondary' | 'light' | 'white' | 'disabled';
  shape?: 'rounded' | 'square';
  size?: 'sm' | 'lg';
  lang?: 'kor' | 'eng';
}

const JudsonFont = Judson({
  subsets: ['latin'],
  weight: '400',
});

/**
 * 버튼 컴포넌트입니다.
 *
 * @param {'primary' | 'secondary' | 'light' | 'white' | 'disabled'} [bg='primary'] - 버튼 배경색
 * @param {'rounded' | 'square'} [shape='rounded'] - 버튼 모양 (둥근 or 각진)
 * @param {'sm' | 'lg'} [size='sm'] - 버튼 크기 (내용 너비 or 전체 너비)
 * @param {'kor' | 'eng'} [lang='kor'] - 언어 설정 (영어일 경우 Judson 폰트 적용)
 * @param {React.ButtonHTMLAttributes<HTMLButtonElement>} rest - 기본 버튼 속성 (onClick 등)
 */
function Button({ children, bg = 'primary', shape = 'rounded', size = 'sm', lang = 'kor', ...rest }: ButtonProps) {
  const btnColor = {
    primary: 'bg-primary text-white',
    secondary: 'bg-secondary-1 text-white',
    light: 'bg-secondary-2 text-white',
    white: 'bg-white text-primary border-1 border-primary',
    disabled: 'bg-gray-150 text-white',
  };

  const btnShape = {
    rounded: 'rounded-full',
    square: '',
  };

  const btnSize = {
    sm: 'w-fit',
    lg: 'w-full',
  };

  return (
    <button
      className={`px-6 py-2 cursor-pointer ${btnColor[bg]} ${btnShape[shape]} ${btnSize[size]} ${
        lang === 'eng' ? JudsonFont.className : null
      }`}
      {...rest}
    >
      {children}
    </button>
  );
}

export default Button;
