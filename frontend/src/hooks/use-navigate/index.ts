import { useParams, usePathname, useRouter, useSearchParams } from 'next/navigation';

import { useThrottle } from '../use-throttle';

export const useNavigate = <TParams = any>() => {
  const { push } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = useParams();
  const pushThrottledFunction = useThrottle(push, 1000);
  return {
    push: pushThrottledFunction,
    pathname,
    params: params as TParams,
    searchParams
  };
};
