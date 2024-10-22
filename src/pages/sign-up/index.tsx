import PATH_NAMES from "@/src/constants/pathname";
import useUserStore from "@/src/stores/userStore";
import { useRouter } from "next/navigation";

export async function getServerSideProps() {
  const user = { name: null };
  return {
    props: { user }, // 페이지에 전달
  };
}

const SignUp = () => {
  const { user } = useUserStore();
  const router = useRouter();

  if (user) return router.replace(PATH_NAMES.Root);

  return (
    <div>
      <p>회원가입 페이지</p>
    </div>
  );
};

export default SignUp;
