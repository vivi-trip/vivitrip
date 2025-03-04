import PATH_NAMES from "@/src/constants/pathname";
import Link from "next/link";

interface SignOptionSectionProps {
  action: "in" | "up";
}

const SIGN_LINK = {
  in: PATH_NAMES.SignUp,
  up: PATH_NAMES.SignIn,
};

const SIGN_TEXT = {
  question: {
    in: "회원이 아니신가요?",
    up: "회원이신가요?",
  },
  button: {
    in: "회원가입하기",
    up: "로그인하기",
  },
};

const SignOptionSection = ({ action }: SignOptionSectionProps) => {
  return (
    <p className="mt-32 break-keep text-center">
      <span className="font-16px-regular text-gray-800">
        {SIGN_TEXT.question[action]}
      </span>
      <Link
        href={SIGN_LINK[action]}
        className="ml-8 text-brand-500 underline underline-offset-2">
        {SIGN_TEXT.button[action]}
      </Link>
    </p>
  );
};

export default SignOptionSection;
