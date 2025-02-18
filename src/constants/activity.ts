/**
 * @desc
 * PopularActivityItem 컴포넌트
 */
import { ActivityTextStyleType } from "@/src/types/activity";

const ACTIVITY_TEXT_STYLE_PRESET: Record<ActivityTextStyleType, string> = {
  isXsScreen: "font-16px-bold !h-40 !leading-[20px]",
  isSmToMdScreen: "font-20px-bold h-52 !leading-[26px]",
  isMdToLgScreen: "font-28px-bold h-72 !leading-[36px]",
  default:
    "font-18px-bold md:font-24px-bold lg:font-32px-bold h-52 md:h-64 lg:h-84",
};

export default ACTIVITY_TEXT_STYLE_PRESET;
