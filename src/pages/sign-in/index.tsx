import PATH_NAMES from "@/src/constants/pathname";
import useUserStore from "@/src/stores/userStore";
import { User } from "@/src/types/user";
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
  const { user, setUser } = useUserStore();
  const router = useRouter();

  const handleSignIn = () => {
    setUser(DUMMY_USER);
    router.replace(PATH_NAMES.Root);
  };

  if (user) return router.replace(PATH_NAMES.Root);

  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-32">
      <h1 className="text-center text-4xl">로그인 페이지</h1>
      <button
        type="button"
        onClick={handleSignIn}
        className="mx-auto block rounded border border-blue-200 bg-gray-50 px-32 py-8 text-blue-200 hover:bg-blue-50">
        임시 유저 로그인
      </button>
    </div>
  );
};

export default SignIn;
