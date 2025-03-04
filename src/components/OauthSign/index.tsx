import OauthSignButton from "@/src/components/OauthSignButton";
import useWindowSize from "@/src/hooks/useWindowSize";
import { OauthSignProps } from "@/src/types/oauth";
import clsx from "clsx";

const OauthSign = ({ action }: OauthSignProps) => {
  const windowSize = useWindowSize();

  return (
    <div className="mt-48">
      <div className="flex items-center justify-center gap-[4%]">
        <i className="h-1 w-full bg-gray-200" />
        <p
          className={clsx(
            "font-20px-regular w-full flex-1 text-nowrap text-center text-gray-700",
            windowSize === "xs" && "!whitespace-normal break-keep",
          )}>
          {`SNS 계정으로 ${action === "in" ? "로그인" : "회원가입"}하기`}
        </p>
        <i className="h-1 w-full bg-gray-200" />
      </div>
      <div className="mt-40 flex items-center justify-center gap-16">
        {/* <OauthSignButton action={action} provider="google" /> */}
        <OauthSignButton action={action} provider="kakao" />
      </div>
    </div>
  );
};

export default OauthSign;
