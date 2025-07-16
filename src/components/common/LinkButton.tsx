import { Judson } from 'next/font/google';
import Link from 'next/link';

interface LinkButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
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
 * 링크 버튼 컴포넌트입니다.
 *
 * @param {string} [href='/'] - 이동할 링크
 * @param {'primary' | 'secondary' | 'light' | 'white' | 'disabled'} [bg='primary'] - 링크 버튼 배경색
 * @param {'rounded' | 'square'} [shape='rounded'] - 링크 버튼 모양 (둥근 or 각진)
 * @param {'sm' | 'lg'} [size='sm'] - 링크 버튼 크기 (내용 너비 or 전체 너비)
 * @param {'kor' | 'eng'} [lang='kor'] - 언어 설정 (영어일 경우 Judson 폰트 적용)
 * @param {React.AnchorHTMLAttributes<HTMLAnchorElement>} rest - 기본 링크 속성 (onClick 등)
 */
function LinkButton({
  children,
  href = '/',
  bg = 'primary',
  shape = 'rounded',
  size = 'sm',
  lang = 'kor',
  ...rest
}: LinkButtonProps) {
  const linkBtnColor = {
    primary: 'bg-primary text-white',
    secondary: 'bg-secondary-1 text-white',
    light: 'bg-secondary-2 text-white',
    white: 'bg-white text-primary border-1 border-primary',
    disabled: 'bg-gray-150 text-white',
  };

  const linkBtnShape = {
    rounded: 'rounded-full',
    square: '',
  };

  const linkBtnSize = {
    sm: 'w-fit',
    lg: 'w-full',
  };

  return (
    <Link
      href={href}
      className={`px-6 py-2 cursor-pointer inline-block text-center ${linkBtnColor[bg]} ${linkBtnShape[shape]} ${
        linkBtnSize[size]
      } ${lang === 'eng' ? JudsonFont.className : null}`}
      {...rest}
    >
      {children}
    </Link>
  );
}

export default LinkButton;
