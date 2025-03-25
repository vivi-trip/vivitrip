import ActivityConservation from "@/src/components/MyActivities/ActivityConservation";
import SideNavigationMenu from "@/src/components/SideNavigationMenu/SideNavigationMenu";
import { useGetActivities } from "@/src/queries/useActivities";
import useUserStore from "@/src/stores/useUserStore";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const RegisterModify = () => {
  const router = useRouter();
  const [activityId, setActivityId] = useState<number | undefined>(undefined);

  const { userData } = useUserStore();

  useEffect(() => {
    if (!router.isReady) return;

    const numericId = Number(router.query.id);
    if (!Number.isNaN(numericId)) {
      setActivityId(numericId);
    } else {
      setActivityId(undefined);
    }
  }, [router.isReady, router.query.id]);

  const { data: activitiesDetail } = useGetActivities(activityId);

  useEffect(() => {
    if (!userData) {
      // 로그인하지 않은 경우, 로그인 페이지로 리다이렉트
      router.push("/sign-in");
      return;
    }

    if (activitiesDetail && activitiesDetail.userId !== userData.id) {
      // 활동의 소유자가 아닌 경우, 메인 페이지나 다른 페이지로 리다이렉트
      router.push("/home");
    }
  }, [activitiesDetail, userData, router]);

  return (
    <div>
      <div className="flex w-full min-w-343 justify-center gap-24 pt-72">
        <SideNavigationMenu />
        <div className="flex-1">
          {activityId && <ActivityConservation activityId={activityId} />}
        </div>
      </div>
    </div>
  );
};

export default RegisterModify;
