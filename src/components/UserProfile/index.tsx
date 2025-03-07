import AccountCheckIcon from "@/assets/svgs/ic_account_check.svg";
import CalendarCheckIcon from "@/assets/svgs/ic_calendar_check.svg";
import LogoutIcon from "@/assets/svgs/ic_logout.svg";
import SettingCheckIcon from "@/assets/svgs/ic_setting_check.svg";
import TextboxCheckIcon from "@/assets/svgs/ic_textbox_check.svg";
import Avatar from "@/src/components/Avatar";
import Dropdown from "@/src/components/Dropdown";
import PATH_NAMES from "@/src/constants/pathname";
import { useSignOut } from "@/src/queries/auth";
import clsx from "clsx";
import { useRouter } from "next/router";
import { ReactNode } from "react";

interface UserProfileMenuProps {
  id: string;
  icon: ReactNode;
  name: string;
  handleClick: () => void;
}

const UserProfile = () => {
  const router = useRouter();
  const { handleSignOut } = useSignOut();

  const USER_PROFILE_MENU_LIST: UserProfileMenuProps[] = [
    {
      id: "MyPage",
      icon: <AccountCheckIcon viewBox="0 0 24 24" width={16} height={16} />,
      name: "내정보",
      handleClick: () => router.push(PATH_NAMES.MyPage),
    },
    {
      id: "MyReservations",
      icon: <TextboxCheckIcon viewBox="0 0 24 24" width={16} height={16} />,
      name: "예약 내역",
      handleClick: () => router.push(PATH_NAMES.MyReservations),
    },
    {
      id: "MyActivities",
      icon: <SettingCheckIcon viewBox="0 0 24 24" width={16} height={16} />,
      name: "내 체험 관리",
      handleClick: () => router.push(PATH_NAMES.MyActivities),
    },
    {
      id: "ReservationHistory",
      icon: <CalendarCheckIcon viewBox="0 0 24 24" width={16} height={16} />,
      name: "예약 현황",
      handleClick: () => router.push(PATH_NAMES.ReservationHistory),
    },
    {
      id: "Logout",
      icon: <LogoutIcon width={16} height={16} />,
      name: "로그아웃",
      handleClick: handleSignOut,
    },
  ];

  return (
    <Dropdown>
      <Dropdown.Trigger>
        <Avatar />
      </Dropdown.Trigger>
      <Dropdown.Menu className="left-auto right-0 !mt-8 !border-gray-200 !bg-gray-200 shadow-lg">
        {USER_PROFILE_MENU_LIST.map(({ id, icon, name, handleClick }, idx) => {
          return (
            <Dropdown.Item
              key={`userProfileMenu_${id}`}
              className={clsx(
                "flex items-center justify-start",
                "min-h-44 min-w-136 gap-8 p-8 px-12",
                "font-14px-medium",
                "bg-white text-gray-600",
                "transition-all",
                "hover:bg-gray-50 hover:text-brand-500",
                idx !== 0 && "mt-1",
              )}
              onClick={handleClick}>
              {icon}
              {name}
            </Dropdown.Item>
          );
        })}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default UserProfile;
