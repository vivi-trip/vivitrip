export interface Activity {
  id: number;
  userId: number;
  title: string;
  description: string;
  category: string;
  price: number;
  address: string;
  bannerImageUrl: string;
  rating: number;
  reviewCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface ActivitiesResponse {
  activities: Activity[];
  totalCount: number;
}

export interface AllActivitiesListProps {
  activities: Activity[];
  selectedCategory: string;
}

interface BaseActivitiesProps {
  activities: Activity[];
  emptyMessage: string;
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
