import IconArrowDown from "@/assets/svgs/ic_arrow_down.svg";
import IconArrowUp from "@/assets/svgs/ic_arrow_up.svg";
import IconEmpty from "@/assets/svgs/ic_empty.svg";
import Dropdown from "@/src/components/Dropdown";
import ReservationHistoryCalendar from "@/src/components/ReservationHistory/ReservationHistoryCalendar";
import SideNavigationMenu from "@/src/components/SideNavigationMenu/SideNavigationMenu";
import MyPageWrap from "@/src/containers/MyPageWrap";
import { useGetMyActivities } from "@/src/hooks/useMyActivities";
import useUserStore from "@/src/stores/useUserStore";
import clsx from "clsx";
import { useState } from "react";

const MyReservationHistory = () => {
  const { userData } = useUserStore.getState();

  const { data } = useGetMyActivities({});

  const myActivities = data?.activities;

  const [selectedActivityId, setSelectedActivityId] = useState<
    number | undefined
  >();
  const [isOpen, setIsOpen] = useState(false);
  const [activityTitle, setActivityTitle] = useState("");

  if (!userData) return null;

  return (
    <MyPageWrap>
      <SideNavigationMenu />
      <div className="flex-1">
        <p className="font-32px-bold">내 체험 예약 현황</p>
        {myActivities ? (
          <div className="mt-32">
            <div className="relative mb-24 lg:mb-30">
              <p className="font-14px-regular absolute left-12 top-[-10px] z-10 bg-gray-50 px-4">
                체험명
              </p>
              <Dropdown className="bg-white">
                <Dropdown.Trigger
                  onClick={() => {
                    setIsOpen(true);
                  }}
                  className={clsx(
                    "font-16px-regular text-left",
                    "flex h-56 w-full items-center justify-between",
                    "rounded-4 border border-gray-500",
                    "px-16 py-15",
                  )}>
                  {activityTitle || "체험을 선택하세요"}
                  {isOpen ? <IconArrowUp /> : <IconArrowDown />}
                </Dropdown.Trigger>
                <Dropdown.Menu className="w-full bg-white">
                  {myActivities && myActivities.length > 0 ? (
                    myActivities.map((activity) => (
                      <Dropdown.Item
                        key={activity.id}
                        className={clsx(
                          "font-16px-regular flex justify-start py-15 pl-16 text-black",
                          activityTitle === activity.title
                            ? "bg-brand-400 text-white"
                            : "hover:bg-gray-100",
                        )}
                        onClick={() => {
                          setSelectedActivityId(activity.id);
                          setActivityTitle(activity.title);
                          setIsOpen(false);
                        }}>
                        {activity.title}
                      </Dropdown.Item>
                    ))
                  ) : (
                    <Dropdown.Item className="font-16px-regular flex justify-start py-15 pl-16 text-gray-500">
                      체험이 없습니다.
                    </Dropdown.Item>
                  )}
                </Dropdown.Menu>
              </Dropdown>
            </div>
            <div className="mb-20">
              {selectedActivityId && (
                <ReservationHistoryCalendar activityId={selectedActivityId} />
              )}
            </div>
          </div>
        ) : (
          <div
            className={clsx(
              "font-24px-medium mt-50 flex flex-col items-center text-gray-700",
              "md:mt-64",
              "lg:mt-80",
            )}>
            <IconEmpty />
            <p className="font-18px-medium mt-37">아직 등록한 체험이 없어요.</p>
          </div>
        )}
      </div>
    </MyPageWrap>
  );
};

export default MyReservationHistory;
