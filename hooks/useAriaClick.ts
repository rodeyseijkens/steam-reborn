import { useCallback } from 'react';

const useAriaClick = (callback: (e: any) => void | null) => {
  const onAriaClick = useCallback(
    (e) => {
      if (e.type === 'keydown' && e.code !== 'Space') return null;
      e.preventDefault();
      return callback(e);
    },
    [callback],
  );

  return {
    onClick: onAriaClick,
    onKeyDown: onAriaClick,
  };
};

export default useAriaClick;
