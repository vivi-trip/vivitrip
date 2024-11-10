export interface PaginationProps {
  totalItems: number; // 데이터 총 개수
  itemCountPerPage: number; // 페이지 당 데이터 개수
  pageCount: number; // 한 번에 보여줄 페이지 개수
  currentPage: number; // 현재 페이지
}

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
