import { Activity } from "@/src/types/activities";
import { ReactNode } from "react";

export type ActivityTextWrapperStyleType =
  | "isExtraXsScreen"
  | "isSmallerXsScreen"
  | "isXsScreen"
  | "default";

export type ActivityRatingTextStyleType =
  | "isSmallerXsScreen"
  | "isXsScreen"
  | "default";

export type ActivityTitleTextStyleType =
  | "isExtraXsScreen"
  | "isSmallerXsScreen"
  | "isXsScreen"
  | "isSmToMdScreen"
  | "isMdToLgScreen"
  | "default";

export type ActivityPriceTextStyleType =
  | "isExtraXsScreen"
  | "isSmallerXsScreen"
  | "isXsScreen"
  | "default";

export interface AllActivitiesListProps {
  activities: Activity[];
  selectedCategory: string;
}

interface BaseActivitiesProps {
  activities: Activity[];
  emptyMessage: string | ReactNode;
}

export interface PopularActivitiesProps extends BaseActivitiesProps {
  currentIndex: number;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
  containerWidth: number;
  totalCount: number;
  handlePrev: () => void;
  handleNext: () => void;
  itemsPerSlide: number;
}

export interface PopularActivityItemProps extends Activity {
  onImageLoad: (width: number) => void;
}

export interface AllActivitiesProps extends BaseActivitiesProps {
  setSize?: React.Dispatch<React.SetStateAction<number>>;
  selectedCategory?: string;
  className: string;
}

export interface SearchableLayoutProps {
  className: string;
  children: React.ReactNode;
}
