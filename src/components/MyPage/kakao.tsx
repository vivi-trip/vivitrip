import Button from "@/src/components/Button/Button";
import Logo from "@/src/components/Logo";
import useUserStore from "@/src/stores/userStore";
import { MyPageProps } from "@/src/types/user";

const MyPageKakao = ({ handleSubmit, isPending }: MyPageProps) => {
  const { userData } = useUserStore();

  return (
    <div className="mx-auto flex min-h-main w-full max-w-640 flex-col items-stretch justify-center py-48">
      <Logo size="lg" />

      <form className="mt-56 flex flex-col gap-32" onSubmit={handleSubmit}>
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
