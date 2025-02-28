/**
 * @description
 * 윈도우 사이즈
 */
import { useEffect, useState } from "react";

const WINDOW_SIZES = {
  sm: 480,
  md: 1024,
  lg: Infinity,
} as const;

type WindowSizes = keyof typeof WINDOW_SIZES;

export default function useWindowSize() {
  const [windowSize, setWindowSize] = useState<WindowSizes>("lg");

  useEffect(() => {
    const getWindowSize = () => {
      const windowWidth = window.innerWidth;
      const size = Object.entries(WINDOW_SIZES).find(
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        ([key, val]) => windowWidth < val,
      )?.[0] as WindowSizes;

      setWindowSize(size);
    };

    getWindowSize();

    window.addEventListener("resize", getWindowSize);

    return () => window.removeEventListener("resize", getWindowSize);
  }, []);

  return windowSize;
}
