import OauthSignButton from "@/src/components/OauthSignButton";
import { OauthSignProps } from "@/src/types/oauth";

const OauthSign = ({ action }: OauthSignProps) => {
  return (
    <div className="mt-48">
      <div className="flex items-center gap-36">
        <i className="h-1 w-full bg-gray-200" />
        <p className="font-20px-regular text-nowrap text-gray-700">
          SNS 계정으로 {action === "in" ? "로그인" : "회원가입"}하기
        </p>
        <i className="h-1 w-full bg-gray-200" />
      </div>
      <div className="mt-40 flex items-center justify-center gap-16">
        <OauthSignButton action={action} provider="kakao" />
        <OauthSignButton action={action} provider="google" />
      </div>
    </div>
  );
};

export default OauthSign;
