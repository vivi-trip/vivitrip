import Button from "@/src/components/Button/Button";
import ActivityList from "@/src/components/MyAtivities/ActivityList";
import SideNavigationMenu from "@/src/components/SideNavigationMenu/SideNavigationMenu";
import { useRouter } from "next/router";

const MyActivities = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/my-activities/registration");
  };
  return (
    <div>
      <div className="flex w-full justify-center gap-24 pt-72">
        <SideNavigationMenu />
        <div className="flex-1">
          <div className="flex justify-between">
            <p className="font-32px-bold">내 체험 관리</p>
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
          <div className="">
            <ActivityList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyActivities;
