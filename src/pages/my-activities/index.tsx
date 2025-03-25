import Button from "@/src/components/Button/Button";
import ActivityList from "@/src/components/MyActivities/ActivityList";
import SideNavigationMenu from "@/src/components/SideNavigationMenu/SideNavigationMenu";
import PATH_NAMES from "@/src/constants/pathname";
import { useRouter } from "next/router";

const MyActivities = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push(PATH_NAMES.MyActivitiesRegistration);
  };

  return (
    <div className="flex w-full justify-center gap-24 pt-72">
      <SideNavigationMenu />
      <div className="flex-1">
        <div className="flex justify-between">
          <p className="font-24px-bold md:font-32px-bold">내 체험 관리</p>
          <Button
            type="button"
            width="120"
            height="48"
            radius="4"
            gap="4"
            fontStyle="l"
            backgroundColor="black"
            onClick={handleClick}>
            체험 등록하기
          </Button>
        </div>
        <ActivityList />
      </div>
    </div>
  );
};

export default MyActivities;
