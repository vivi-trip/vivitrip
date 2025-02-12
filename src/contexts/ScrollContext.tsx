import { ComponentProps } from "@/src/types/type";
import clsx from "clsx";
import { createContext, useCallback, useContext, useMemo, useRef } from "react";

interface ScrollContextProps {
  handleScrollToTop: () => void;
}

const ScrollContext = createContext<ScrollContextProps | null>(null);

interface ScrollProviderProps extends ComponentProps {
  as?: "div" | "main";
}

const ScrollProvider = ({
  children,
  className,
  as: Component = "div",
}: ScrollProviderProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScrollToTop = useCallback(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: 0, behavior: "instant" });
    }
  }, []);

  const contextValue = useMemo(
    () => ({ handleScrollToTop }),
    [handleScrollToTop],
  );

  return (
    <ScrollContext.Provider value={contextValue}>
      <Component ref={scrollRef} className={clsx("overflow-auto", className)}>
        {children}
      </Component>
    </ScrollContext.Provider>
  );
};

export const useScroll = () => {
  const context = useContext(ScrollContext);
  if (!context) {
    throw new Error("useScroll 은 ScrollProvider 안에서 실행되어야합니다.");
  }
  return context;
};

export default ScrollProvider;
