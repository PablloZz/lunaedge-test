import { useEffect, useState } from "react";

const useGetScrollProgress = <T extends HTMLElement>(
  ref: React.RefObject<T>
) => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const element = ref.current;

    const scrollHandler = (event: Event) => {
      const target = event.target as HTMLUListElement;
      const height = target.clientHeight;
      const scrollHeight = target.scrollHeight;
      const currentScrollHeight = target.scrollTop;
      const currentScrollPosition = height + currentScrollHeight;
      const scrollProgress = (currentScrollPosition / scrollHeight);
      setScrollProgress(scrollProgress);
    };

    element?.addEventListener("scroll", scrollHandler);

    return () => {
      element?.removeEventListener("scroll", scrollHandler);
    };
  }, []);

  return scrollProgress;
};

export { useGetScrollProgress };
