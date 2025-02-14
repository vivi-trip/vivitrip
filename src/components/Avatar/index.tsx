import IconUser from "@/assets/svgs/ic_user.svg";
import useUserStore from "@/src/stores/userStore";
import { ProfileImageUrl } from "@/src/types/user";
import clsx from "clsx";

const Avatar = () => {
  const { userData, userProvider } = useUserStore();

  const profileImageUrl: ProfileImageUrl | null = (() => {
    try {
      if (userData) {
        if (typeof userData.profileImageUrl === "string")
          return {
            url: userData.profileImageUrl,
            name: `${userData.nickname} 프로필 이미지`,
          };
      }
      return JSON.parse(userData?.profileImageUrl || "");
    } catch {
      return null;
    }
  })();

  const AVATAR_TYPES = {
    kakao: {
      context: "카카오",
      className: "border-[#fae100]",
    },
    google: {
      context: "구글",
      className:
        "border-b-[#34A853] border-l-[#FBBC04] border-r-[#4285F4] border-t-[#EA4335]",
    },
  };

  if (!userData) return null;

  return (
    <article className="flex flex-wrap items-center justify-center gap-8">
      {profileImageUrl ? (
        <div className="relative">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={profileImageUrl.url}
            alt={profileImageUrl.name}
            className="relative size-32 rounded-full"
          />
          <div
            className={clsx(
              "absolute -inset-4 rounded-full border-2 text-[0]",
              userProvider
                ? AVATAR_TYPES[userProvider].className
                : "border-brand-400",
            )}>
            {userProvider ? AVATAR_TYPES[userProvider].context : "일반"} 계정
          </div>
        </div>
      ) : (
        <IconUser className="text-brand-600" />
      )}
      <p className="font-16px-medium hidden text-brand-600 md:block">
        {userData.nickname}
      </p>
    </article>
  );
};

export default Avatar;
