import ActivityConservation from "@/src/components/MyAtivities/ActivityConservation";
import SideNavigationMenu from "@/src/components/SideNavigationMenu/SideNavigationMenu";

const Registration = () => {
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
