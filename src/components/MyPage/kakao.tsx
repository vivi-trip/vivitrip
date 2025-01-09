/* eslint-disable no-console */
import Button from "@/src/components/Button/Button";
import Logo from "@/src/components/Logo";
import useUserStore from "@/src/stores/userStore";
import { MyPageProps } from "@/src/types/user";
import Image from "next/image";
import type { ChangeEvent } from "react";

/**
 * @todo
 * - 프로필 이미지 클릭 시 바로 파일 선택
 * - 이미지 파일 확인 로직 선행
 * - 이미지 선택 시 바로 이미지 수정 api 로직 수행
 * - 마이페이지용 프로필 이미지 수정 컴포넌트 따로 생성
 */

const MyPageKakao = ({ handleSubmit, isPending }: MyPageProps) => {
  const { userData } = useUserStore();

  const handleProfileImage = (event: ChangeEvent<HTMLInputElement>) => {
    console.log("🚀 ~ handleProfileImage ~ event:", event);

    const { files } = event.target;
    const file = files ? files[0] : null;
    console.log("🚀 ~ handleProfileImage ~ file:", file);
  };

  return (
    <div className="mx-auto flex min-h-main w-full max-w-640 flex-col items-stretch justify-center py-48">
      <Logo size="lg" />

      <form className="mt-56 flex flex-col gap-32" onSubmit={handleSubmit}>
        <div className="relative">
          <label htmlFor="user_profileImageUrl" className="flex flex-col gap-8">
            <p className="font-16px-regular text-basic-black">프로필 이미지</p>
            <Image
              width={64}
              height={64}
              src="http://k.kakaocdn.net/dn/T8UUe/btsyuHUMWsu/OG7UAr6XqY3V7iE8xzKfv0/img_640x640.jpg"
              alt="프로필 이미지"
              className="rounded-16"
            />
            <input
              type="file"
              name="profileImageUrl"
              id="user_profileImageUrl"
              placeholder="프로필 이미지를 등록해 주세요"
              className="font-16px-regular min-h-56 rounded-6 border border-gray-500 px-20 py-12 outline-none transition-all focus:border-brand-400"
              defaultValue={userData?.profileImageUrl}
              onChange={handleProfileImage}
            />
          </label>
        </div>

        <div className="relative">
          <label htmlFor="user_nickname" className="flex flex-col gap-8">
            <p className="font-16px-regular text-basic-black">닉네임</p>
            <input
              type="text"
              name="nickname"
              id="user_nickname"
              placeholder="닉네임을 입력해 주세요"
              className="font-16px-regular min-h-56 rounded-6 border border-gray-500 px-20 py-12 outline-none transition-all focus:border-brand-400"
              defaultValue={userData?.nickname}
            />
          </label>
        </div>

        <div className="relative">
          <Button
            type="submit"
            height="56"
            fullWidth
            radius="6"
            backgroundColor="black"
            fontStyle="xl"
            disabled={isPending}
            className="disabled:bg-gray-500">
            수정하기
          </Button>
        </div>
      </form>
    </div>
  );
};

export default MyPageKakao;
