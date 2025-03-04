import IcHamburger from "@/assets/svgs/ic_hamburger.svg";
import Dropdown from "@/src/components/Dropdown";
import PATH_NAMES from "@/src/constants/pathname";
import useWindowSize from "@/src/hooks/useWindowSize";
import Link from "next/link";
import { useRouter } from "next/router";

const CLASS_NAME = {
  text: "font-16px-medium text-basic-black text-nowrap",
};

const SignMenu = () => {
  const router = useRouter();
  const windowSize = useWindowSize();

  if (windowSize === "xs" || windowSize === "sm")
    return (
      <Dropdown>
        <Dropdown.Trigger>
          <IcHamburger width={32} height={32} />
        </Dropdown.Trigger>
        <Dropdown.Menu className="left-auto right-0 !border-gray-200 !bg-gray-200 shadow-lg">
          <Dropdown.Item
            className="min-h-48 min-w-120 bg-white"
            onClick={() => router.push(PATH_NAMES.SignIn)}>
            로그인
          </Dropdown.Item>
          <Dropdown.Item
            className="mt-1 min-h-48 min-w-120 bg-white"
            onClick={() => router.push(PATH_NAMES.SignUp)}>
            회원가입
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );

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
