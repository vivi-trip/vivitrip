import ButtonProps from "../types/button";
import lottieJson from "@/assets/json/404.json";
import AltArrowLeft from "@/assets/svgs/AltArrowLeft.svg";
import AltArrowRight from "@/assets/svgs/AltArrowRight.svg";
import Button from "@/src/components/Button/Button";
import { NextPage } from "next";
import { useRouter } from "next/navigation";
import Lottie from "react-lottie-player";

// statusCode 반환
export const getStaticProps = async () => {
  return {
    props: {
      statusCode: 404,
    },
  };
};

const Custom404: NextPage<{ statusCode: number }> = () => {
  const router = useRouter();

  const commonButtonProps: ButtonProps = {
    type: "button",
    height: "45",
    fullWidth: true,
    radius: "8",
    gap: "4",
    fontStyle: "l",
    className: "bg-basic-navy text-white lg:!h-48 lg:text-18px-medium",
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <div className="flex w-350 flex-col gap-24 text-center lg:w-440 lg:gap-30">
        <Lottie loop animationData={lottieJson} play />
        <h1 className="text-24px-bold text-basic-navy lg:text-28px-bold">
          페이지를 찾을 수 없습니다.
        </h1>
        <h5 className="text-16px-regular lg:text-18px-regular text-gray-800">
          페이지가 존재하지 않거나 사용할 수 없는 페이지입니다. <br />
          입력하신 주소가 정확한지 다시 한 번 확인해주세요.
        </h5>
        <div className="flex gap-4 lg:mx-25 lg:gap-8">
          <Button {...commonButtonProps} onClick={() => router.back()}>
            <AltArrowLeft width={21} height={20} className="text-white" />
            이전으로
          </Button>
          <Button {...commonButtonProps} onClick={() => router.push("/")}>
            메인으로
            <AltArrowRight width={21} height={20} className="text-white" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Custom404;
