import PATH_NAMES from "@/src/constants/pathname";
import Link from "next/link";

const CLASS_NAME = {
  text: "text-16px-medium text-basic-black text-nowrap",
};

const SignMenu = () => {
  return (
    <div className="flex items-center gap-24">
      <Link href={PATH_NAMES.SignIn} className={CLASS_NAME.text}>
        로그인
      </Link>
      <Link href={PATH_NAMES.SignUp} className={CLASS_NAME.text}>
        회원가입
      </Link>
    </div>
  );
};

export default SignMenu;
