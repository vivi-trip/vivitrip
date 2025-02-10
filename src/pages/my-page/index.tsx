import Logo from "@/src/components/Logo";
import MyPage from "@/src/components/MyPage";
import MyPageKakao from "@/src/components/MyPage/kakao";
import SideNavigationMenu from "@/src/components/SideNavigationMenu/SideNavigationMenu";
import PATH_NAMES from "@/src/constants/pathname";
import useHydration from "@/src/hooks/useHydration";
import { useUpdateMyData } from "@/src/queries/auth";
import useUserStore from "@/src/stores/userStore";
import { UserPatchProps } from "@/src/types/user";
import { useRouter } from "next/router";
import { FormEvent, useEffect, useState } from "react";

const RouteMyPage = () => {
  const router = useRouter();
  const isHydrated = useHydration();
  const { userData, userProvider } = useUserStore.getState();
  const { mutate, isPending } = useUpdateMyData();

  const [imageUrl, setImageUrl] = useState("");

  const onChangeImageURL = (newImageUrl: string) => {
    setImageUrl(newImageUrl); // 이미지 URL 업데이트 함수
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const param = Object.fromEntries(formData) as unknown as UserPatchProps;

    param.profileImageUrl = imageUrl;

    if (userProvider === "kakao") {
      param.newPassword = userData?.email
        ? String(userData?.email.split("@").shift())
        : "00000000";
    }

    mutate(param);
  };

  useEffect(() => {
    if (!userData) router.replace(PATH_NAMES.Root);
  }, [userData, router]);

  if (!isHydrated) return null;

  if (isPending)
    return (
      <div className="mx-auto flex min-h-main w-full max-w-640 flex-col items-stretch justify-center py-48">
        <Logo size="lg" />
      </div>
    );

  switch (userProvider) {
    case "google": {
      return <p>MyPageGoogle</p>;
    }
    case "kakao": {
      return <MyPageKakao handleSubmit={handleSubmit} isPending={isPending} />;
    }
    default: {
      return (
        <div className="flex w-full justify-center gap-24 pt-72">
          <div className="hidden md:block">
            <SideNavigationMenu url={onChangeImageURL} />
          </div>
          <div className="md:flex-1">
            <MyPage handleSubmit={handleSubmit} isPending={isPending} />
          </div>
        </div>
      );
    }
  }
};

export default RouteMyPage;
