import { Activity } from "@/src/types/activities";
import { ReactNode } from "react";

export type ActivityTextStyleType =
  | "isXsScreen"
  | "isSmToMdScreen"
  | "isMdToLgScreen"
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
