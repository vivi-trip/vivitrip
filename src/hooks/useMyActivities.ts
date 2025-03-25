import {
  deleteArticle,
  getMyActivities,
  getMyReservationDashboard,
  getMyReservedSchedule,
  getMyResrvations,
  patchMyActivity,
  patchReservaionState,
} from "@/src/services/myActivitiesApi";
import {
  GetMyActivities,
  MyActivities,
  PatchMyActivityParams,
  ReservationState,
  ReservatedScheduleParams,
  ReservationDashboardParams,
  ReservationInfosType,
  ReservationMonthInfosType,
  ReservationScheduleType,
  ReservationsParams,
} from "@/src/types/activitiesReservationType";
import {
  infiniteQueryOptions,
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

export const useGetMyActivities = (params: GetMyActivities) => {
  const { data, isLoading, error } = useQuery<MyActivities>({
    queryKey: ["myActivities", params],
    queryFn: () => getMyActivities(params || {}),
  });

  return { data, isLoading, error };
};

export const useGetMyReservationDashboard = (
  params: ReservationDashboardParams,
) => {
  const { data, isLoading, error } = useQuery<ReservationMonthInfosType>({
    queryKey: ["myReservationDashboard", params],
    queryFn: () => getMyReservationDashboard(params),
  });

  return { data, isLoading, error };
};

export const useGetMyReservedSchedule = (params: ReservatedScheduleParams) => {
  const { data, isLoading, error } = useQuery<ReservationScheduleType[]>({
    queryKey: ["myReservedSchedule", params],
    queryFn: () => getMyReservedSchedule(params),
  });
  return { data, isLoading, error };
};

export const useGetMyReservations = (
  params: ReservationsParams,
  enabled: boolean,
) => {
  const { data, isLoading, error } = useQuery<ReservationInfosType>({
    queryKey: ["myResrvations", params],
    queryFn: () => getMyResrvations(params),
    enabled,
  });
  return { data, isLoading, error };
};

export const usePatchReservationState = () => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: (params: ReservationState) => patchReservaionState(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myReservationDashboard"] });
    },
  });

  return { mutate };
};

export const useDeleteArticle = () => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: (params: number) => deleteArticle(params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["activities"],
      });
    },
  });
  return { mutate };
};

export const usePatchMyActivity = () => {
  const { mutate } = useMutation({
    mutationFn: ({ activityId, updateData }: PatchMyActivityParams) =>
      patchMyActivity(activityId, updateData),
  });
  return { mutate };
};

export const useGetInfiniteMyActivities = (size: number = 5) => {
  const { data, fetchNextPage, hasNextPage, isError, ...rest } =
    useInfiniteQuery(
      infiniteQueryOptions<MyActivities>({
        queryKey: ["activities"],
        queryFn: ({ pageParam }) => {
          const cursorId =
            typeof pageParam === "number" ? pageParam : undefined;
          return getMyActivities({ cursorId, size });
        },
        initialPageParam: undefined,
        getNextPageParam: (lastPage) => {
          return lastPage.cursorId ?? undefined;
        },
      }),
    );
  return { data, fetchNextPage, hasNextPage, isError, ...rest };
};
