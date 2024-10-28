import useUserStore from "@/src/stores/userStore";
import { ProfileImageUrl } from "@/src/types/user";

export async function getServerSideProps() {
  const user = { name: null };
  return {
    props: { user }, // 페이지에 전달
  };
}

const Avatar = () => {
  const { user } = useUserStore();

  const profileImageUrl: ProfileImageUrl = JSON.parse(
    user?.profileImageUrl ?? "",
  );

  if (!user) return null;

  return (
    <article className="flex flex-wrap items-center justify-center gap-8">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={profileImageUrl.url}
        alt={profileImageUrl.name}
        className="h-32 w-32 rounded-full"
      />
      <p className="text-16px-medium text-basic-black">{user.nickname}</p>
    </article>
  );
};

export default Avatar;
