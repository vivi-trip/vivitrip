import Button from "@/src/components/Button/Button";
import Logo from "@/src/components/Logo";
import OauthSign from "@/src/components/OauthSign";
import PATH_NAMES from "@/src/constants/pathname";
import useUserStore from "@/src/stores/userStore";
import { User } from "@/src/types/user";
import Link from "next/link";
import { useRouter } from "next/navigation";

export async function getServerSideProps() {
  const user = { name: null };
  return {
    props: { user }, // 페이지에 전달
  };
}

const DUMMY_USER: User = {
  id: 0,
  email: "dummy@user.temp",
  nickname: "더미 사용자",
  profileImageUrl:
    '{"url":"https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Albaform/user/98/1729314330709/maxresdefault.jpg","name":"profileImageUrl.name"}',
  createdAt: "2024-10-22T13:12:34.720Z",
  updatedAt: "2024-10-22T13:12:34.720Z",
};

const SignIn = () => {
  const { userData, setUserData } = useUserStore();
  const router = useRouter();

  const handleSignIn = () => {
    setUser(DUMMY_USER);
    router.replace(PATH_NAMES.Root);
  };

  if (userData) return router.replace(PATH_NAMES.Root);

  return (
    <div className="mx-auto flex min-h-main w-full max-w-640 flex-col items-stretch justify-center py-48">
      <Logo size="lg" />

      <form className="mt-56 flex flex-col gap-32" onSubmit={handleSignIn}>
        <div className="relative">
          <label htmlFor="login_id" className="flex flex-col gap-8">
            <p className="text-16px-regular text-basic-black">이메일</p>
            <input
              type="text"
              id="login_id"
              placeholder="이메일을 입력해 주세요"
              className="text-16px-regular focus:border-brand-400 min-h-56 rounded-6 border border-gray-500 px-20 py-12 outline-none transition-all"
            />
          </label>
        </div>
        <div className="relative">
          <label htmlFor="login_pw" className="flex flex-col gap-8">
            <p className="text-16px-regular text-basic-black">비밀번호</p>
            <input
              type="password"
              id="login_pw"
              placeholder="비밀번호을 입력해 주세요"
              className="text-16px-regular focus:border-brand-400 min-h-56 rounded-6 border border-gray-500 px-20 py-12 outline-none transition-all"
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
            className="disabled:bg-gray-500">
            로그인 하기
          </Button>
        </div>
      </form>

      <p className="mt-32 text-center">
        <span className="text-16px-regular text-gray-800">
          회원이 아니신가요?
        </span>
        <Link
          href={PATH_NAMES.SignUp}
          className="text-brand-500 ml-8 underline underline-offset-2">
          회원가입하기
        </Link>
      </p>

      <OauthSign action="in" />
    </div>
  );
};

export default SignIn;
