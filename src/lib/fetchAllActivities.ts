import api from "@/src/services/axios";
import { ActivitiesResponse } from "@/src/types/activity";

const FetchAllActivities = async (
  sort: string,
  category?: string,
): Promise<ActivitiesResponse> => {
  let url;

  if (category) {
    url = `/activities?method=offset&sort=${sort}&category=${category}`;
  } else {
    url = `/activities?method=offset&sort=${sort}`;
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

export default FetchAllActivities;
