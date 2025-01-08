import { Activity } from "@/src/types/activities";
import { ReactNode } from "react";

export interface AllActivitiesListProps {
  activities: Activity[];
  selectedCategory: string;
}

interface BaseActivitiesProps {
  activities: Activity[];
  emptyMessage: ReactNode;
}

export interface PopularActivitiesProps extends BaseActivitiesProps {
  currentIndex: number;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
}

export interface AllActivitiesProps extends BaseActivitiesProps {
  setSize?: React.Dispatch<React.SetStateAction<number>>;
  selectedCategory?: string;
}

export interface SearchableLayoutProps {
  className: string;
  children: React.ReactNode;
}
