// Packages
import {useCallback, useEffect, useRef, useState} from 'react';

// Hook
export default function useAsync<T>({
  asyncFunction,
  onSuccess,
  onError,
  onPending,
  shouldRun = false
}: UseAsyncProps<T>) {
  const [state, setState] = useState<State<T>>({
    status: 'idle',
    data: null,
    error: null
  });

  const safeOnSuccess = useRef<Function>();
  const safeOnError = useRef<Function>();
  const safeOnPending = useRef<Function>();

  useEffect(() => {
    if (onSuccess) safeOnSuccess.current = onSuccess;
    if (onError) safeOnError.current = onError;
    if (onPending) safeOnPending.current = onPending;
  }, [onSuccess, onError, onPending]);

  const run = useCallback(
    (params?: any) => {
      setState({
        status: 'pending',
        data: null,
        error: null
      });
      if (safeOnPending.current) safeOnPending.current();
      return asyncFunction(params)
        .then((data: any) => {
          setState({
            status: 'success',
            data,
            error: null
          });
          if (safeOnSuccess.current) safeOnSuccess.current(data);
        })
        .catch((error: any) => {
          setState({
            status: 'fail',
            data: null,
            error
          });
          if (safeOnError.current) safeOnError.current(error);
        });
    },
    [asyncFunction]
  );
  useEffect(() => {
    if (shouldRun) {
      run();
    }
  }, [run, shouldRun]);
  return {run, ...state} as const;
}

interface UseAsyncProps<T> {
  asyncFunction: (params?: any) => Promise<T>;
  onSuccess?: (result: T) => void;
  onError?: (error: Error) => void;
  onPending?: () => void;
  shouldRun?: boolean;
}

interface State<T> {
  status: 'idle' | 'pending' | 'success' | 'fail';
  data: T | null;
  error: Error | null;
}
