import {
  createActivity,
  createActivityImageUrl,
  createActivityReservation,
  getActivity,
} from "../services/activities";
import { patchMyActivity } from "../services/myActiviesApi";
import {
  ActivityImageUrl,
  CreateActivityProps,
  CreateActivityReservationProps,
} from "../types/activities";
import { ActivityUpdateRequest } from "../types/activitiesReservationType";
import { ActivityDetailResponse } from "../types/activitiesResponses";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetActivities = (activityId: number | undefined) => {
  const { data, isLoading, error } = useQuery<ActivityDetailResponse>({
    queryKey: ["activity", activityId],
    queryFn: () => {
      if (activityId === undefined) {
        throw new Error("Activity ID is undefined");
      }
      return getActivity({ activityId });
    },
    enabled: activityId !== undefined,
  });

  return { data, isLoading, error };
};

export const useCreateActivity = () => {
  return useMutation({
    mutationFn: (data: CreateActivityProps) => createActivity(data),
  });
};

export const usePatchMyActivity = () => {
  return useMutation({
    mutationFn: ({
      activityId,
      updateData,
    }: {
      activityId: number;
      updateData: ActivityUpdateRequest;
    }) => patchMyActivity(activityId, updateData),
  });
};

export const usePostActivityReservation = () => {
  return useMutation({
    mutationFn: (activityReservayiondata: CreateActivityReservationProps) =>
      createActivityReservation(activityReservayiondata),
  });
};

export const useUploadActivtyAddImage = () => {
  const { mutate } = useMutation<ActivityImageUrl, Error, File>({
    mutationFn: (file: File) => createActivityImageUrl(file),
  });
  return { mutate };
};
