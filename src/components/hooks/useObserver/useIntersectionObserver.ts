import { useEffect, useRef } from 'react';

export default function useIntersectionObserver(callback: () => void) {
  const sentinelRef = useRef<HTMLDivElement>(null);
  const callbackRef = useRef(callback);
  callbackRef.current = callback;
  useEffect(() => {
    const observer = new IntersectionObserver(items => {
      items.forEach(item => {
        if (item.isIntersecting) {
          callbackRef.current();
        }
      });
    });
    if (sentinelRef.current) {
      observer.observe(sentinelRef.current);
    }

    return () => {
      if (sentinelRef.current) {
        observer.unobserve(sentinelRef.current);
      }
    };
  }, []);

  return { sentinelRef };
}
