/* eslint-disable no-console */
import {
  createActivity,
  createActivityImageUrl,
  createActivityReservation,
  getActivity,
} from "@/src/services/activities";
import { patchMyActivity } from "@/src/services/myActivitiesApi";
import {
  ActivityImageUrl,
  CreateActivityProps,
  CreateActivityReservationProps,
} from "@/src/types/activities";
import { ActivityUpdateRequest } from "@/src/types/activitiesReservationType";
import { ActivityDetailResponse } from "@/src/types/activitiesResponses";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

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
    onSuccess: async () => {
      try {
        const response = await fetch(`/api/revalidate?path=/home`, {
          method: "POST",
        });
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Revalidation failed: ${errorText}`);
        }
      } catch (error) {
        console.error(error);
      }
    },
  });
};

export const usePatchMyActivity = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      activityId,
      updateData,
    }: {
      activityId: number;
      updateData: ActivityUpdateRequest;
    }) => patchMyActivity(activityId, updateData),
    onSuccess: async (_, { activityId }) => {
      try {
        queryClient.invalidateQueries({
          queryKey: ["activity", activityId],
        });

        const pathsToRevalidate = [`/activity/${activityId}`, "/home"];

        await Promise.all(
          pathsToRevalidate.map(async (path) => {
            const response = await fetch(`/api/revalidate?path=${path}`, {
              method: "POST",
            });
            if (!response.ok) {
              const errorText = await response.text();
              throw new Error(`Revalidation failed for ${path}: ${errorText}`);
            }
          }),
        );
      } catch (error) {
        console.error(error);
      }
    },
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
