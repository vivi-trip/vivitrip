import {
  deleteArticle,
  getMyActivities,
  getMyReservationDashboard,
  getMyReservedSchedule,
  getMyResrvations,
  patchMyActivity,
  patchReservaionState,
} from "../services/myActiviesApi";
import {
  GetMyActivities,
  MyActivities,
  PatchMyActivityParams,
  ReservaitionState,
  ReservatdeScheduleParams,
  ReservationDashboardParams,
  ReservationInfosType,
  ReservationMonthInfosType,
  ReservationScheduleType,
  ReservationsParams,
} from "../types/activitiesReservationType";
import {
  infiniteQueryOptions,
  useInfiniteQuery,
  useMutation,
  useQuery,
} from "@tanstack/react-query";

export const useGetMyActivities = (params: GetMyActivities) => {
  const { data, isLoading, error } = useQuery<MyActivities>({
    queryKey: ["myActivities", params],
    queryFn: () => getMyActivities(params),
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

export const useGetMyReservedSchedule = (
  params: ReservatdeScheduleParams,
  enabled: boolean,
) => {
  const { data, isLoading, error } = useQuery<ReservationScheduleType>({
    queryKey: ["myReservedSchedule", params],
    queryFn: () => getMyReservedSchedule(params),
    enabled,
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
  const { mutate } = useMutation({
    mutationFn: (params: ReservaitionState) => patchReservaionState(params),
  });

  return { mutate };
};

export const useDeleteArticle = () => {
  const { mutate } = useMutation({
    mutationFn: (params: number) => deleteArticle(params),
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

export const useGetInfiniteMyActivities = () => {
  const { data, fetchNextPage, hasNextPage, isError, ...rest } =
    useInfiniteQuery(
      infiniteQueryOptions<MyActivities>({
        queryKey: ["activities", "list"],
        queryFn: ({ pageParam }) => {
          const cursorId =
            typeof pageParam === "number" ? pageParam : undefined;
          return getMyActivities({ cursorId, size: 5 });
        },
        initialPageParam: undefined,
        getNextPageParam: (lastPage) => {
          return lastPage.cursorId ?? undefined;
        },
      }),
    );
  return { data, fetchNextPage, hasNextPage, isError, ...rest };
};
