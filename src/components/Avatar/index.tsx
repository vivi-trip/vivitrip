import IconUser from "@/assets/svgs/ic_user.svg";
import useUserStore from "@/src/stores/userStore";
import { ProfileImageUrl } from "@/src/types/user";

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
          {userProvider && userProvider === "kakao" ? (
            <div className="absolute -inset-4 rounded-full border-2 border-[#fae100] text-[0]">
              카카오 계정
            </div>
          ) : (
            <div className="absolute -inset-4 rounded-full border-2 border-b-[#34A853] border-l-[#FBBC04] border-r-[#4285F4] border-t-[#EA4335] text-[0]">
              구글 계정
            </div>
          )}
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
