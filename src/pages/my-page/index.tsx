import Logo from "@/src/components/Logo";
import PopupModal from "@/src/components/Modal/PopupModal";
import MyPage from "@/src/components/MyPage";
import MyPageKakao from "@/src/components/MyPage/kakao";
import ProfileUpload from "@/src/components/SideNavigationMenu/Common/ProfileUpload";
import SideNavigationMenu from "@/src/components/SideNavigationMenu/SideNavigationMenu";
import PATH_NAMES from "@/src/constants/pathname";
import useHydration from "@/src/hooks/useHydration";
import { useUpdateMyData } from "@/src/queries/auth";
import useModalStore from "@/src/stores/modalStore";
import useProfileImageUrlStore from "@/src/stores/useProfileImageUrlStore";
import useUserStore from "@/src/stores/userStore";
import { UserPatchProps } from "@/src/types/user";
import { useRouter } from "next/router";
import { useEffect } from "react";

const RouteMyPage = () => {
  const router = useRouter();
  const isHydrated = useHydration();
  const { userData, userProvider } = useUserStore.getState();
  const { mutate, isPending } = useUpdateMyData();
  const { newProfileImageUrl } = useProfileImageUrlStore();
  const { setModalOpen } = useModalStore();

  const handleSubmit = async (data: UserPatchProps) => {
    if (!userData) return;

    const { nickname, newPassword } = data;

    const param = {
      nickname,
      profileImageUrl: (newProfileImageUrl ||
        userData.profileImageUrl) as string,
      newPassword,
    };

    const RESPONSE_MESSAGE = {
      success: "수정되었습니다.",
      error: "오류가 발생했습니다.",
    };

    mutate(param, {
      onSuccess({ status }) {
        setModalOpen(
          <PopupModal
            title={
              status === 200 ? RESPONSE_MESSAGE.success : RESPONSE_MESSAGE.error
            }
          />,
        );
      },
      onError() {
        setModalOpen(<PopupModal title={RESPONSE_MESSAGE.error} />);
      },
    });
  };

  useEffect(() => {
    if (!userData) router.replace(PATH_NAMES.Root);
  }, [userData, router]);

  if (!isHydrated || !userData) return null;

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
      return (
        <div className="flex w-full justify-center gap-24 pt-72">
          <div className="hidden md:block">
            <SideNavigationMenu />
          </div>
          <div className="flex-1">
            <MyPageKakao />
          </div>
        </div>
      );
    }
    default: {
      return (
        <div className="flex w-full justify-center gap-24 pt-72">
          <div className="hidden md:block">
            <SideNavigationMenu canChangeProfile />
          </div>
          <div className="flex-1">
            <MyPage handleSubmit={handleSubmit} isPending={isPending}>
              <div className="flex justify-center md:hidden">
                <ProfileUpload profileImageUrl={userData.profileImageUrl} />
              </div>
            </MyPage>
          </div>
        </div>
      );
    }
  }
};

export default RouteMyPage;
