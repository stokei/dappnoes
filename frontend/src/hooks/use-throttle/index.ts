import { useMemo, useRef } from 'react';
import throttle from 'lodash/throttle';

/**
 * Custom hook to throttle a function using lodash.
 * @param callback The function to throttle.
 * @param delay The throttle delay in milliseconds.
 * @returns A throttled version of the callback function.
 */
export function useThrottle<T extends (...args: any[]) => void>(
  callback: T,
  delay: number
): (...args: Parameters<T>) => void {
  const callbackRef = useRef(callback);
  callbackRef.current = callback;
  const throttledFunction = useMemo(
    () =>
      throttle((...args: Parameters<T>) => {
        callbackRef.current(...args);
      }, delay),
    [delay]
  );

  return throttledFunction;
}
