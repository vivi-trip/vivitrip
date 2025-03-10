import Button from "@/src/components/Button/Button";
import useUserStore from "@/src/stores/userStore";
import { MyPageProps } from "@/src/types/user";

const MyPage = ({ handleSubmit, isPending }: MyPageProps) => {
  const { userData } = useUserStore();

  if (!userData) return null;

  return (
    <div className="mx-auto w-full max-w-640 pb-48 md:ml-0">
      <p className="font-32px-bold">내정보</p>

      <form className="mt-32 flex flex-col gap-32" onSubmit={handleSubmit}>
        <div className="relative">
          <label htmlFor="login_id" className="flex flex-col gap-8">
            <p className="font-16px-regular text-basic-black">이메일</p>
            <input
              type="email"
              name="email"
              id="login_email"
              placeholder="이메일을 입력해 주세요"
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
            />
          </label>
        </div>

        <div className="relative">
          <label htmlFor="login_pw" className="flex flex-col gap-8">
            <p className="font-16px-regular text-basic-black">비밀번호</p>
            <input
              type="password"
              name="newPassword"
              id="login_newPassword"
              placeholder="비밀번호을 입력해 주세요"
              className="font-16px-regular min-h-56 rounded-6 border border-gray-500 px-20 py-12 outline-none transition-all focus:border-brand-400"
            />
          </label>
        </div>

        <div className="relative">
          <label htmlFor="login_pw" className="flex flex-col gap-8">
            <p className="font-16px-regular text-basic-black">비밀번호 확인</p>
            <input
              type="password"
              name="confirmNewPassword"
              id="login_confirmNewPassword"
              placeholder="비밀번호을 한 번 더 입력해 주세요"
              className="font-16px-regular min-h-56 rounded-6 border border-gray-500 px-20 py-12 outline-none transition-all focus:border-brand-400"
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

export default MyPage;
