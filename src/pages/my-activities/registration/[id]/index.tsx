import ActivityConservation from "@/src/components/MyAtivities/ActivityConservation";
import SideNavigationMenu from "@/src/components/SideNavigationMenu/SideNavigationMenu";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const RegisterModify = () => {
  const router = useRouter();
  const [activityId, setActivityId] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (router.isReady) {
      const numericId = Number(router.query.id);
      setActivityId(numericId);
    }
  }, [router.isReady, router.query.id]);

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
