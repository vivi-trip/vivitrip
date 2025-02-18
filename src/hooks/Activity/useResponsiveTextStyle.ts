import ACTIVITY_TEXT_STYLE_PRESET from "@/src/constants/activity";
import { useEffect, useState } from "react";

const useResponsiveTextStyle = () => {
  const [isXsScreen, setIsXsScreen] = useState(false);
  const [isSmToMdScreen, setIsSmToMdScreen] = useState(false);
  const [isMdToLgScreen, setIsMdToLgScreen] = useState(false);

  useEffect(() => {
    const updateScreenSize = () => {
      setIsXsScreen(window.innerWidth < 590);
      setIsSmToMdScreen(window.innerWidth >= 768 && window.innerWidth < 900);
      setIsMdToLgScreen(window.innerWidth >= 1024 && window.innerWidth < 1155);
    };

    updateScreenSize();
    window.addEventListener("resize", updateScreenSize);
    return () => {
      window.removeEventListener("resize", updateScreenSize);
    };
  }, []);

  const getActivityTextStyle = () => {
    switch (true) {
      case isXsScreen:
        return ACTIVITY_TEXT_STYLE_PRESET.isXsScreen;
      case isSmToMdScreen:
        return ACTIVITY_TEXT_STYLE_PRESET.isSmToMdScreen;
      case isMdToLgScreen:
        return ACTIVITY_TEXT_STYLE_PRESET.isMdToLgScreen;
      default:
        return ACTIVITY_TEXT_STYLE_PRESET.default;
    }
  };

  return { isXsScreen, getActivityTextStyle };
};

export default useResponsiveTextStyle;
