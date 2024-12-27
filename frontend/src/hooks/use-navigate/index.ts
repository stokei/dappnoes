import { usePathname, useRouter } from 'next/navigation';

export const useNavigate = () => {
  const { push } = useRouter();
  const pathname = usePathname();
  return {
    push,
    pathname
  };
};
