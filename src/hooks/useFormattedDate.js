// src/hooks/useFormattedDate.js

import { useCallback } from "react";

const useFormattedDate = () => {
 
    const formatDate = useCallback((dateString) => {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.toLocaleString('default', { month: 'long' });
        const year = date.getFullYear();
        return `${day} ${month} ${year}`;
      }, []);
    
      return formatDate;
  };
  
  export default useFormattedDate;
  

  