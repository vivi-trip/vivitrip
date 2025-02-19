import {
  ACTIVITY_PRICE_TEXT_STYLE_PRESET,
  ACTIVITY_RATING_TEXT_STYLE_PRESET,
  ACTIVITY_TEXT_WRAPPER_STYLE_PRESET,
  ACTIVITY_TITLE_TEXT_STYLE_PRESET,
} from "@/src/constants/activity";
import { useEffect, useState } from "react";

const useResponsiveTextStyle = () => {
  const [isExtraXsScreen, setIsExtraXsScreen] = useState(false);
  const [isSmallerXsScreen, setIsSmallerXsScreen] = useState(false);
  const [isXsScreen, setIsXsScreen] = useState(false);
  const [isSmToMdScreen, setIsSmToMdScreen] = useState(false);
  const [isMdToLgScreen, setIsMdToLgScreen] = useState(false);

  useEffect(() => {
    const updateScreenSize = () => {
      setIsExtraXsScreen(window.innerWidth <= 380);
      setIsSmallerXsScreen(window.innerWidth > 380 && window.innerWidth <= 477);
      setIsXsScreen(window.innerWidth > 477 && window.innerWidth < 590);
      setIsSmToMdScreen(window.innerWidth >= 768 && window.innerWidth < 900);
      setIsMdToLgScreen(window.innerWidth >= 1024 && window.innerWidth < 1155);
    };

    updateScreenSize();
    window.addEventListener("resize", updateScreenSize);
    return () => {
      window.removeEventListener("resize", updateScreenSize);
    };
  }, []);

  const getActivityTextWrapperStyle = () => {
    switch (true) {
      case isSmallerXsScreen:
        return ACTIVITY_TEXT_WRAPPER_STYLE_PRESET.isSmallerXsScreen;
      case isXsScreen:
        return ACTIVITY_TEXT_WRAPPER_STYLE_PRESET.isXsScreen;
      default:
        return ACTIVITY_RATING_TEXT_STYLE_PRESET.default;
    }
  };

  const getActivityRatingTextStyle = () => {
    switch (true) {
      case isSmallerXsScreen:
        return ACTIVITY_RATING_TEXT_STYLE_PRESET.isSmallerXsScreen;
      case isXsScreen:
        return ACTIVITY_RATING_TEXT_STYLE_PRESET.isXsScreen;
      default:
        return ACTIVITY_RATING_TEXT_STYLE_PRESET.default;
    }
  };

  const getActivityTitleTextStyle = () => {
    switch (true) {
      case isExtraXsScreen:
        return ACTIVITY_TITLE_TEXT_STYLE_PRESET.isExtraXsScreen;
      case isSmallerXsScreen:
        return ACTIVITY_TITLE_TEXT_STYLE_PRESET.isSmallerXsScreen;
      case isXsScreen:
        return ACTIVITY_TITLE_TEXT_STYLE_PRESET.isXsScreen;
      case isSmToMdScreen:
        return ACTIVITY_TITLE_TEXT_STYLE_PRESET.isSmToMdScreen;
      case isMdToLgScreen:
        return ACTIVITY_TITLE_TEXT_STYLE_PRESET.isMdToLgScreen;
      default:
        return ACTIVITY_TITLE_TEXT_STYLE_PRESET.default;
    }
  };

  const getActivityPriceTextStyle = () => {
    switch (true) {
      case isSmallerXsScreen:
        return ACTIVITY_PRICE_TEXT_STYLE_PRESET.isSmallerXsScreen;
      case isXsScreen:
        return ACTIVITY_PRICE_TEXT_STYLE_PRESET.isXsScreen;
      default:
        return ACTIVITY_PRICE_TEXT_STYLE_PRESET.default;
    }
  };

  return {
    isXsScreen,
    isSmallerXsScreen,
    isExtraXsScreen,
    getActivityTextWrapperStyle,
    getActivityRatingTextStyle,
    getActivityTitleTextStyle,
    getActivityPriceTextStyle,
  };
};

export default useResponsiveTextStyle;
