/**
 * @desc
 * PopularActivityItem 컴포넌트
 */
import {
  ActivityPriceTextStyleType,
  ActivityRatingTextStyleType,
  ActivityTextWrapperStyleType,
  ActivityTitleTextStyleType,
} from "@/src/types/activity";

export const ACTIVITY_TEXT_WRAPPER_STYLE_PRESET: Record<
  ActivityTextWrapperStyleType,
  string
> = {
  isSmallerXsScreen: "!bottom-0 !gap-0 !p-10",
  isXsScreen: "!bottom-0 !p-15",
  default: "",
};

export const ACTIVITY_RATING_TEXT_STYLE_PRESET: Record<
  ActivityRatingTextStyleType,
  string
> = {
  isSmallerXsScreen: "font-12px-semibold",
  isXsScreen: "font-14px-semibold",
  default: "font-14px-semibold",
};

export const ACTIVITY_TITLE_TEXT_STYLE_PRESET: Record<
  ActivityTitleTextStyleType,
  string
> = {
  isExtraXsScreen: "",
  isSmallerXsScreen: "font-16px-bold line-clamp-1 ",
  isXsScreen: "font-16px-bold !h-40 !leading-[20px]",
  isSmToMdScreen: "font-20px-bold h-52 !leading-[26px]",
  isMdToLgScreen: "font-28px-bold h-72 !leading-[36px]",
  default:
    "font-18px-bold md:font-24px-bold lg:font-32px-bold h-52 md:h-64 lg:h-84",
};

export const ACTIVITY_PRICE_TEXT_STYLE_PRESET: Record<
  ActivityPriceTextStyleType,
  string
> = {
  isSmallerXsScreen: "font-12px-bold line-clamp-1 max-w-60",
  isXsScreen: "font-14px-bold",
  default: "font-16px-bold md:font-18px-bold lg:font-20px-bold ",
};
