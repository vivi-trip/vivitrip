export interface SubImage {
  id?: number;
  imageUrl: string;
}

export interface Schedule {
  id?: number;
  date: string;
  startTime: string;
  endTime: string;
}

export interface ActivityBasicDataType {
  title: string;
  description: string;
  category: string;
  price: number;
  address: string;
}

export interface ActivityDetailResponse extends ActivityBasicDataType {
  id: number;
  userId: number;
  bannerImageUrl: string;
  subImages: SubImage[];
  schedules: Schedule[];
  reviewCount: number;
  rating: number;
  createdAt: string;
  updatedAt: string;
}
