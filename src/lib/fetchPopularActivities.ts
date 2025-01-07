import api from "@/src/services/axios";
import { ActivitiesResponse } from "@/src/types/activity";

const fetchPopularActivities = async (
  size: number,
  page?: number,
  q?: string,
): Promise<ActivitiesResponse> => {
  let url = `/activities?method=offset&sort=most_reviewed&page=1&size=${size}`;

  if (q) {
    url = `/activities?method=offset&keyword=${q}&sort=latest&page=${page}&size=${size}`;
  }

  try {
    const response = await api.get(url);
    return response.data;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return { activities: [], totalCount: 0 };
  }
};

export default fetchPopularActivities;
