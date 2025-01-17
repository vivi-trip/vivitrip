export interface ReviewItem {
  id: number;
  user: {
    id: number;
    nickname: string;
    profileImageUrl: string | null;
  };
  activityId: number;
  content: string;
  rating: number;
  createdAt: string;
  updatedAt: string;
}

export interface ReviewSummary {
  reviews: ReviewItem[];
  totalCount: number;
  averageRating?: number;
}

export interface ReviewListProps {
  fetchedReviews: ReviewItem[];
}
