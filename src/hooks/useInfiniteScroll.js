import { useEffect, useRef } from "react";
import { debounce } from "lodash";

const useInfiniteScroll = (callback) => {
  const observer = useRef();
  const targetRef = useRef();

  useEffect(() => {
    if (observer.current) observer.current.disconnect();

    const debouncedCallback = debounce(callback, 300);

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        debouncedCallback();
      }
    });

    if (targetRef.current) observer.current.observe(targetRef.current);

    return () => {
      if (observer.current) observer.current.disconnect();
      debouncedCallback.cancel();
    };
  }, [callback]);

  return targetRef;
};

export default useInfiniteScroll;