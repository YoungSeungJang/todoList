import Image from 'next/image';
import Link from 'next/link';

const Logo = () => {
  return (
    <Link href="/">
      <Image
        className="cursor-pointer hidden md:block"
        src="/images/Size=Large.svg"
        width={150}
        height={150}
        alt="데스크탑 로고"
      />
      <Image
        className="cursor-pointer block md:hidden"
        src="/images/Size=small.svg"
        width={150}
        height={150}
        alt="모바일 로고"
      />
    </Link>
  );
};

export default Logo;
