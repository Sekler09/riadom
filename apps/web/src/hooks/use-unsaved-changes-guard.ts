import { useBlocker } from '@tanstack/react-router';
import { useEffect, useRef } from 'react';

const useUnsavedChangesGuard = (isDirty: boolean) => {
  const dirtyRef = useRef(isDirty);

  useEffect(() => {
    dirtyRef.current = isDirty;
  }, [isDirty]);

  return useBlocker({
    shouldBlockFn: () => dirtyRef.current,
    enableBeforeUnload: () => dirtyRef.current,
    withResolver: true,
  });
};

export { useUnsavedChangesGuard };
