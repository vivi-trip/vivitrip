import ActivityConservation from "@/src/components/MyActivities/ActivityConservation";
import SideNavigationMenu from "@/src/components/SideNavigationMenu/SideNavigationMenu";
import useUserStore from "@/src/stores/useUserStore";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Registration = () => {
  const { userData } = useUserStore();

  const router = useRouter();

  useEffect(() => {
    if (!userData) {
      router.push("/sign-in");
    }
  }, [userData, router]);

  return (
    <div>
      <div className="flex w-full min-w-343 justify-center gap-24 pt-72">
        <SideNavigationMenu />
        <div className="flex-1">
          <ActivityConservation />
        </div>
      </div>
    </div>
  );
};

export default Registration;
