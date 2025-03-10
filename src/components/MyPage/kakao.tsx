/* eslint-disable no-alert */

/* eslint-disable no-restricted-globals */

/* eslint-disable no-console */
import Button from "@/src/components/Button/Button";
import PATH_NAMES from "@/src/constants/pathname";
import { deleteKakaoUser } from "@/src/services/auth";
import useUserStore from "@/src/stores/userStore";
import { useRouter } from "next/router";

const MyPageKakao = () => {
  const router = useRouter();
  const { userData, clearUser } = useUserStore();

  const handleClick = async () => {
    if (!userData) return;

    const answer = confirm("카카오 계정 연결을 끊으시겠습니까?");

    if (!answer) return;

    const kakaoId = Number(userData.email.split("@")[0]);

    await deleteKakaoUser(kakaoId).then(() => {
      clearUser();
    });

    router.replace(PATH_NAMES.Root);
  };

  if (!userData) return null;

  return (
    <div className="mx-auto w-full max-w-640 pb-48 md:ml-0">
      <p className="font-32px-bold">내정보</p>

      <div className="mt-32 flex flex-col gap-32">
        <div className="relative">
          <label htmlFor="login_id" className="flex flex-col gap-8">
            <p className="font-16px-regular text-basic-black">회원번호</p>
            <input
              type="id"
              name="id"
              id="login_id"
              className="font-16px-regular min-h-56 rounded-6 border border-gray-500 px-20 py-12 outline-none transition-all focus:border-brand-400"
              defaultValue={userData.id}
              readOnly
              disabled
            />
          </label>
        </div>

        <div className="relative">
          <label htmlFor="login_id" className="flex flex-col gap-8">
            <p className="font-16px-regular text-basic-black">이메일</p>
            <input
              type="email"
              name="email"
              id="login_email"
              className="font-16px-regular min-h-56 rounded-6 border border-gray-500 px-20 py-12 outline-none transition-all focus:border-brand-400"
              defaultValue={userData.email}
              readOnly
              disabled
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
              defaultValue={userData.nickname}
              readOnly
              disabled
            />
          </label>
        </div>

        <div className="relative">
          <Button
            type="button"
            height="56"
            fullWidth
            radius="6"
            fontStyle="l"
            className="bg-[#fae100]"
            onClick={handleClick}>
            카카오 계정 연결 끊기
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MyPageKakao;
