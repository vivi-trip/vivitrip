import ActivityConservation from "@/src/components/MyActivities/ActivityConservation";
import SideNavigationMenu from "@/src/components/SideNavigationMenu/SideNavigationMenu";
import PATH_NAMES from "@/src/constants/pathname";
import { useGetActivities } from "@/src/queries/useActivities";
import useUserStore from "@/src/stores/useUserStore";
import { useRouter } from "next/router";
import { useEffect } from "react";

const RegisterModify = () => {
  const router = useRouter();
  const { id: activityId } = router.query;
  const { userData } = useUserStore.getState();
  const { data: activitiesDetail } = useGetActivities(Number(activityId));

  useEffect(() => {
    if (
      userData &&
      activitiesDetail &&
      userData.id !== activitiesDetail.userId
    ) {
      router.replace(PATH_NAMES.Root);
    }
  }, [router, userData, activitiesDetail]);

  if (!userData) {
    return null;
  }

  return (
    <div>
      <div className="flex w-full min-w-343 justify-center gap-24 pt-72">
        <SideNavigationMenu />
        <div className="flex-1">
          {activityId && (
            <ActivityConservation activityId={Number(activityId)} />
          )}
        </div>
      </div>
    </div>
  );
};

export default RegisterModify;
