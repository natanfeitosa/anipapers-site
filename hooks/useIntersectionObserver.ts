import { useRef, useEffect } from "react";

interface useIntersectionObserveOptions
  extends Omit<IntersectionObserverInit, "root"> {
  target: ReturnType<typeof useRef<Element | null>>;
  root?: ReturnType<typeof useRef<Element | null>>;
  onIntersect: () => any;
  enabled: boolean;
}

export default function useIntersectionObserver({
  target,
  root,
  onIntersect,
  enabled = true,
  rootMargin = "0px",
  threshold = 0.5,
}: useIntersectionObserveOptions) {
  useEffect(() => {
    if (!enabled) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) onIntersect();
      },
      {
        rootMargin,
        threshold,
        root: root?.current,
      }
    );

    const el = target && target.current;
    if (!el) {
      return;
    }
    observer.observe(el);
    return () => {
      observer.unobserve(el);
    };
  }, [enabled, rootMargin, threshold, root, target, onIntersect]);
}
