import { useCallback } from 'react';

const useFormatSubscribers = () => {
  return useCallback((sub) => {
    if (sub >= 1e9) return `${(sub / 1e9).toFixed(1)}B subscribers`;
    if (sub >= 1e6) return `${(sub / 1e6).toFixed(1)}M subscribers`;
    if (sub >= 1e3) return `${(sub / 1e3).toFixed(1)}K subscribers`;
    return `${sub} subscribers`;
  }, []);
};

export default useFormatSubscribers;