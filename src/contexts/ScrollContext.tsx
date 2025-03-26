import { ComponentProps } from "@/src/types/type";
import clsx from "clsx";
import { useRouter } from "next/router";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";

interface ScrollContextProps {
  scrollBlock: Dispatch<SetStateAction<boolean>>;
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
  const router = useRouter();
  const { query } = router;
  const hasQuery =
    Object.keys(query).filter((key) => key === "page" || key === "category")
      .length > 0;

  const [scrollBlock, setScrollBlock] = useState<boolean>(false);

  const handleScrollToTop = useCallback(() => {
    if (hasQuery || scrollBlock) {
      return;
    }

    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: 0, behavior: "instant" });
    }
  }, [hasQuery, scrollBlock]);

  const contextValue = useMemo(
    () => ({ scrollBlock: setScrollBlock, handleScrollToTop }),
    [setScrollBlock, handleScrollToTop],
  );

  return (
    <ScrollContext.Provider value={contextValue}>
      <Component
        ref={scrollRef}
        className={clsx("overflow-y-auto overflow-x-hidden", className)}>
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
