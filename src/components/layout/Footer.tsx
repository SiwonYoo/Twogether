import { Judson } from 'next/font/google';

const JudsonFont = Judson({
  subsets: ['latin'],
  weight: '400',
});

function Footer() {
  return (
    <>
      <footer className="absolute bottom-0 left-0 content-center px-5 h-44 w-full bg-gray-550 text-gray-250 pb-20">
        <p className={`${JudsonFont.className}`}>Twogether</p>
        <div className="text-xs">
          <button>개인정보 처리 방침</button> | <button>사이트 이용 약관</button>
        </div>
        <small className="text-xs">© 2025 Twogether. All rights reserved.</small>
      </footer>
    </>
  );
}

export default Footer;
