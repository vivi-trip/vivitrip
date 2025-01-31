import AccountCheckIcon from "@/assets/svgs/ic_account_check.svg";
import CalendarCheckIcon from "@/assets/svgs/ic_calendar_check.svg";
import SettingCheckIcon from "@/assets/svgs/ic_setting_check.svg";
import TextboxCheckIcon from "@/assets/svgs/ic_textbox_check.svg";
import ProfileUpload from "@/src/components/SideNavigationMenu/common/ProfileUpload";
import { useGetUserProfile } from "@/src/queries/useUsers";
import useModalStore from "@/src/stores/ModalStore";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

interface Props {
  url?: (url: string) => void | undefined;
}

const SideNavigationMenu = ({ url }: Props) => {
  const { setModalOpen } = useModalStore();
  const { pathname } = useRouter();
  const [selectedItem, setSelectedItem] = useState<null | number>(null);

  /**
   * @description - 프로필이미지 훅 차후 목데이터 삭제후 사용
   * @todo  삭제 할것
   */
  // const { data } = useGetUserProfile();

  /**
   * @description - 목데이터
   */
  const data = {
    profileImageUrl: undefined,
  };

  const handleClick = (Id: number) => {
    setSelectedItem(Id);
  };

  /** 패스네임 유효성 검사 */
  const isPath = (path?: string) => {
    if (!path) return false;
    const regex = new RegExp(`(^|/)${path.replace(/\*/g, ".*")}($|/)`);
    return regex.test(pathname);
  };

  const menuItems = [
    {
      icon: AccountCheckIcon,
      alt: "내정보 아이콘",
      label: "내정보",
      path: "/my-profile",
      id: 1,
    },
    {
      icon: TextboxCheckIcon,
      alt: "예약내역 아이콘",
      label: "예약 내역",
      path: "/my-reservations",
      id: 2,
    },
    {
      icon: SettingCheckIcon,
      alt: "체험관리 아이콘",
      label: "내 체험 관리",
      path: "/my-activities",
      id: 3,
    },
    {
      icon: CalendarCheckIcon,
      alt: "예약현황 아이콘",
      label: "예약 현황",
      path: "/reservation-history",
      id: 4,
    },
  ];

  return (
    <div
      className={clsx(
        "max-h-432 min-h-432 w-full min-w-241 max-w-384 md:flex md:w-251 lg:w-384",
        "sticky flex-col gap-24 rounded-xl border border-gray-200 bg-white p-24 shadow-[0px_4px_16px_0px_rgba(17,34,17,0.05)]",
        pathname === "/my-profile" ? "flex w-344" : "hidden",
      )}>
      <div className="relative flex justify-center">
        {pathname === "/my-profile"
          ? url && (
              <ProfileUpload url={url} profileImageUrl={data.profileImageUrl} />
            )
          : data && (
              <div className="relative size-160 overflow-hidden rounded-160 bg-gray-200 shadow-[0px_4px_16px_0px_rgba(0,0,0,0.08)]">
                <Image
                  src={
                    data.profileImageUrl
                      ? data.profileImageUrl
                      : "/images/Image_default_profile_image.png"
                  }
                  object-fit="contain"
                  alt="프로필이미지"
                  fill
                />
              </div>
            )}
      </div>
      <ul className="flex flex-col gap-8">
        {menuItems.map((item) => (
          <li key={item.id}>
            <Link href={item.path} passHref legacyBehavior>
              <button
                type="button"
                className={clsx(
                  "font-16px-bold flex h-44 w-full cursor-pointer items-center gap-14 rounded-12 px-16 py-9 text-left",
                  {
                    "text-[#A1A1A1] hover:bg-brand-400 hover:text-black": true,
                    "md:bg-brand-300 md:text-black":
                      selectedItem === item.id || isPath(item.path),
                  },
                )}
                onClick={() => {
                  if (pathname === "/my-profile" && window.innerWidth < 768) {
                    setModalOpen();
                  } else {
                    // 기존 동작
                    handleClick(item.id);
                  }
                }}>
                <item.icon />
                <span className="font-16px-bold">{item.label}</span>
              </button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SideNavigationMenu;
