import IconUser from "@/assets/svgs/ic_user.svg";
import useUserStore from "@/src/stores/userStore";
import { ProfileImageUrl } from "@/src/types/user";

const Avatar = () => {
  const { userData } = useUserStore();

  const profileImageUrl: ProfileImageUrl | null = (() => {
    try {
      return JSON.parse(userData?.profileImageUrl || "");
    } catch {
      return null;
    }
  })();

  if (!userData) return null;

  return (
    <article className="flex flex-wrap items-center justify-center gap-8">
      {profileImageUrl ? (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={profileImageUrl.url}
          alt={profileImageUrl.name}
          className="size-32 rounded-full"
        />
      ) : (
        <IconUser className="text-brand-600" />
      )}
      <p className="text-16px-medium text-brand-600">{userData.nickname}</p>
    </article>
  );
};

export default Avatar;
