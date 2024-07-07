// useInfiniteScroll.js

import { useEffect, useRef } from "react";

const useInfiniteScroll = (callback) => {
  const observer = useRef();
  const targetRef = useRef();

  useEffect(() => {
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        callback();
      }
    });

    if (targetRef.current) observer.current.observe(targetRef.current);

    return () => {
      if (observer.current) observer.current.disconnect();
    };
  }, [callback]);

  return targetRef;
};

export default useInfiniteScroll;
