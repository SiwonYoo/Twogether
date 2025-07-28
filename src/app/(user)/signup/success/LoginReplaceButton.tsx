import Button from '@/components/common/Button';
import { useRouter } from 'next/router';

function LoginReplaceButton() {
  const router = useRouter();

  const handleClick = () => {
    router.replace('/login');
  };

  return (
    <>
      <Button onClick={handleClick} shape="square" lang="eng">
        LOGIN
      </Button>
    </>
  );
}

export default LoginReplaceButton;
