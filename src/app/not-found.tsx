import Button from '@/components/common/Button';
import { Judson } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';

const JudsonFont = Judson({
  subsets: ['latin'],
  weight: '700',
});

export default function NotFound() {
  return (
    <main className="flex flex-col items-center gap-2 h-screen bg-[url('/images/404/space.png')] bg-cover">
      <h2 className={`${JudsonFont.className} text-9xl mt-20 text-white`}>404</h2>
      <p className={`${JudsonFont.className} text-4xl text-white`}>PAGE NOT FOUND</p>
      <Image src="/images/404/notfound.png" alt="404char" width="100" height="100" className="mt-10 animate-bounce" />
      <Link href="/">
        <Button bg="light" lang="eng">
          Twogether Home
        </Button>
      </Link>
    </main>
  );
}
