import { useParams, usePathname, useRouter, useSearchParams } from 'next/navigation';

export const useNavigate = <TParams = any>() => {
  const { push } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = useParams();

  return {
    push,
    pathname,
    params: params as TParams,
    searchParams
  };
};
