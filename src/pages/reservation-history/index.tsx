import IconArrowDown from "@/assets/svgs/ic_arrow_down.svg";
import IconArrowUp from "@/assets/svgs/ic_arrow_up.svg";
import IconEmpty from "@/assets/svgs/ic_empty.svg";
import Dropdown from "@/src/components/Dropdown";
import ReservationHistoryCalendar from "@/src/components/ReservationHistory/ReservationHistoryCalendar";
import SideNavigationMenu from "@/src/components/SideNavigationMenu/SideNavigationMenu";
import { useGetMyActivities } from "@/src/hooks/useMyActivities";
import clsx from "clsx";
import { useState } from "react";

const MyreservationHisroy = () => {
  const { data } = useGetMyActivities({});

  const myActivities = data?.activities;

  const [selectedActivityId, setSelectedActivityId] = useState<
    number | undefined
  >();
  const [isOpen, setIsOpen] = useState(false);
  const [activityTitle, setActivityTitle] = useState("");

  return (
    <div>
      <div className="flex w-full justify-center gap-24 pt-72">
        <SideNavigationMenu />
        <div className="flex-1">
          <div className="flex flex-col">
            <p className="font-32px-bold">예약 현황</p>
            {myActivities ? (
              <div className="mt-32 flex flex-col">
                <div className="relative mb-24 lg:mb-30">
                  <p className="font-14px-regular absolute left-12 top-[-10px] z-10 bg-gray-50 px-4">
                    체험명
                  </p>
                  <Dropdown>
                    <Dropdown.Trigger
                      className={clsx(
                        "font-16px-regular text-left",
                        "flex h-56 w-full items-center justify-between",
                        "rounded-4 border border-gray-500",
                        "px-16 py-15",
                      )}>
                      {activityTitle || "체험을 선택하세요"}
                      {isOpen ? <IconArrowUp /> : <IconArrowDown />}
                    </Dropdown.Trigger>
                    <Dropdown.Menu className="w-full">
                      {myActivities.map((activitie) => (
                        <Dropdown.Item
                          key={activitie.id}
                          className="font-16px-regular flex justify-start py-15 pl-16 text-black hover:bg-gray-100"
                          onClick={() => {
                            setSelectedActivityId(activitie.id);
                            setActivityTitle(activitie.title);
                            setIsOpen(false);
                          }}>
                          {activitie.title}
                        </Dropdown.Item>
                      ))}
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
                <div className="mb-20">
                  {selectedActivityId && (
                    <ReservationHistoryCalendar
                      activityId={selectedActivityId}
                    />
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
                <p className="mt-37">아직 등록한 체험이 없어요.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyreservationHisroy;
