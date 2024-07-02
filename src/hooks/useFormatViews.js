// hooks/useFormatViews.js
import { useCallback } from 'react';

const useFormatViews = () => {
  return useCallback((count) => {
    if (count >= 1e9) return `${(count / 1e9).toFixed(1)}B `;
    if (count >= 1e6) return `${(count / 1e6).toFixed(1)}M `;
    if (count >= 1e3) return `${(count / 1e3).toFixed(1)}K `;
    return `${count} `;
  }, []);
};

export default useFormatViews;
