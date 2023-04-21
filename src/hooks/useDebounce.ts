import { useEffect, useMemo, useRef } from 'react';
import debounce from 'lodash/debounce';

type CallbackFunction = (...args: any[]) => void;

export const useDebounce = (
  callbackFn: CallbackFunction,
  delay: number,
  behavior: 'leading' | 'trailing',
  behavior2?: 'leading' | 'trailing'
) => {
  const isLeading = behavior === 'leading' || behavior2 === 'leading';
  const isTrailing = behavior === 'trailing' || behavior2 === 'trailing';

  // ref is our callbackFn
  const ref = useRef<CallbackFunction | undefined>();

  // ref updates only when callbackFn changes
  useEffect(() => {
    ref.current = callbackFn;
  }, [callbackFn]);

  // creating debouncedCallbackFn only once - on mount
  // func will be created only once - on mount
  // ref is mutable, so ref.current executes the latest callbackFn
  // debounce the func that was created once, but has access to the latest callbackFn
  // no dependencies, never gets updated
  const debouncedCallbackFn = useMemo(() => {
    const func = () => {
      ref.current?.();
    };
    return debounce(func, delay, { leading: isLeading, trailing: isTrailing });
  }, []);

  return debouncedCallbackFn;
};
