// hooks/useFormatPublishedDate.js
import { useCallback } from 'react';

const useFormatPublishedDate = () => {
  return useCallback((date) => {
    const currentDate = new Date();
    const videoDate = new Date(date);
    const diffTime = Math.abs(currentDate - videoDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 1) {
      return 'Today';
    } else if (diffDays === 1) {
      return 'Yesterday';
    } else if (diffDays < 30) {
      return `${diffDays} days ago`;
    } else if (diffDays < 365) {
      const diffMonths = Math.floor(diffDays / 30);
      return `${diffMonths} ${diffMonths > 1 ? 'months' : 'month'} ago`;
    } else {
      const diffYears = Math.floor(diffDays / 365);
      return `${diffYears} ${diffYears > 1 ? 'years' : 'year'} ago`;
    }
  }, []);
};

export default useFormatPublishedDate;
