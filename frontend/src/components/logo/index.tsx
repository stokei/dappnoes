import Image from 'next/image';

export const Logo = () => {
  return (
    <Image
      width={1366}
      height={720}
      quality={90}
      src="/logo.svg"
      alt="Logo"
      className="w-40 object-contain"
    />
  );
};
