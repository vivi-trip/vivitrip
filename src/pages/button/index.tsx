import AltArrowLeft from "@/assets/svgs/AltArrowLeft.svg";
import BtnArrow48pxDefault from "@/assets/svgs/btnArrow48pxDefault.svg";
import BtnArrow48pxVariant4 from "@/assets/svgs/btnArrow48pxVariant4.svg";
import Close from "@/assets/svgs/close.svg";
import Button from "@/src/components/Button/Button";

const button = () => {
  return (
    <div className="flex flex-col gap-16 px-16 py-16">
      <p className="text-16px-semibold">🔻 로그인, 회원가입 페이지</p>
      <div className="flex flex-col gap-4">
        <Button
          type="submit"
          height="48"
          fullWidth
          radius="6"
          gap="10"
          fontStyle="xl"
          disabled={true}>
          로그인 하기
        </Button>
        <Button
          type="submit"
          height="48"
          fullWidth
          radius="6"
          gap="10"
          backgroundColor="green"
          fontStyle="xl">
          로그인 하기
        </Button>
        <Button
          type="submit"
          height="54"
          fullWidth
          radius="8"
          gap="10"
          backgroundColor="black"
          fontStyle="xl">
          로그인 하기
        </Button>
      </div>
      <p className="text-16px-semibold">🔻 로그인, 회원가입 페이지_팝업</p>
      <div className="flex gap-4">
        <Button
          type="button"
          width="120"
          height="48"
          radius="8"
          gap="10"
          backgroundColor="black"
          fontStyle="l">
          확인
        </Button>
        <Button
          type="button"
          width="138"
          height="42"
          radius="8"
          gap="10"
          backgroundColor="black"
          fontStyle="s">
          확인
        </Button>
      </div>
      <p className="text-16px-semibold">🔻 메인화면</p>
      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          <Button
            type="button"
            width="136"
            height="56"
            radius="4"
            gap="4"
            backgroundColor="black"
            fontStyle="xl">
            검색하기
          </Button>
          <Button
            type="button"
            width="96"
            height="56"
            radius="4"
            gap="4"
            backgroundColor="black"
            fontStyle="xl">
            검색하기
          </Button>
        </div>
        <div className="flex gap-4">
          <Button
            type="button"
            width="127"
            height="58"
            radius="15"
            gap="10"
            backgroundColor="white_green"
            fontStyle="xxxl">
            문화 · 예술
          </Button>
          <Button
            type="button"
            width="120"
            height="58"
            radius="15"
            gap="10"
            backgroundColor="white_green"
            fontStyle="xxxl">
            문화 · 예술
          </Button>
        </div>
        <div className="flex gap-4">
          <Button
            type="button"
            width="55"
            height="55"
            radius="15"
            gap="10"
            backgroundColor="white_gray"
            disabled={true}>
            <AltArrowLeft width={21} height={21} className="text-gray" />
          </Button>
          <Button
            type="button"
            width="55"
            height="55"
            radius="15"
            gap="10"
            backgroundColor="green"
            fontStyle="xxxl">
            1
          </Button>
          <Button
            type="button"
            width="55"
            height="55"
            radius="15"
            gap="10"
            backgroundColor="white_green"
            fontStyle="xxl">
            2
          </Button>
          <Button type="button" width="44" height="44" disabled={true}>
            <BtnArrow48pxDefault width={44} height={44} />
          </Button>
          <Button type="button" width="44" height="44">
            <BtnArrow48pxVariant4
              width={44}
              height={44}
              className="text-brand-500"
            />
          </Button>
        </div>
      </div>
      <p className="text-16px-semibold">🔻 체험 상세</p>
      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          <Button
            type="button"
            width="117"
            height="46"
            radius="8"
            gap="10"
            backgroundColor="black"
            fontStyle="l">
            14:00~15:00
          </Button>
          <Button
            type="button"
            width="117"
            height="46"
            radius="8"
            gap="10"
            backgroundColor="white_green"
            fontStyle="l">
            15:00~16:00
          </Button>
        </div>
        <div className="flex gap-4">
          <Button
            type="button"
            width="203"
            height="56"
            radius="4"
            gap="4"
            fontStyle="xl"
            disabled={true}>
            예약하기
          </Button>
          <Button
            type="button"
            width="106"
            height="54"
            radius="6"
            gap="8"
            backgroundColor="black"
            fontStyle="xl">
            예약하기
          </Button>
        </div>
        <div className="flex gap-4">
          <Button
            type="button"
            height="56"
            fullWidth
            radius="4"
            gap="4"
            backgroundColor="black"
            fontStyle="xl">
            예약하기
          </Button>
        </div>
        <div className="flex gap-4">
          <Button
            type="button"
            width="120"
            height="48"
            radius="8"
            gap="10"
            backgroundColor="black"
            fontStyle="l">
            확인
          </Button>
          <Button
            type="button"
            height="56"
            fullWidth
            radius="4"
            gap="4"
            backgroundColor="black"
            fontStyle="xl">
            확인
          </Button>
        </div>
      </div>
      <p className="text-16px-semibold">🔻 내 정보</p>
      <div className="flex gap-4">
        <Button
          type="submit"
          width="120"
          height="48"
          radius="4"
          gap="4"
          backgroundColor="black"
          fontStyle="xl">
          저장하기
        </Button>
      </div>
      <p className="text-16px-semibold">🔻 예약 내역</p>
      <div className="flex gap-4">
        <Button
          type="button"
          width="144"
          height="43.08"
          radius="6"
          gap="8"
          backgroundColor="black"
          fontStyle="xl">
          후기 작성
        </Button>
        <Button
          type="button"
          width="112"
          height="40"
          radius="6"
          gap="8"
          backgroundColor="white_black"
          fontStyle="xl">
          예약 취소
        </Button>
        <Button
          type="button"
          width="80"
          height="38"
          radius="6"
          gap="8"
          backgroundColor="white_black"
          fontStyle="m">
          아니오
        </Button>
        <Button
          type="button"
          width="80"
          height="38"
          radius="6"
          gap="8"
          backgroundColor="black"
          fontStyle="m">
          취소하기
        </Button>
      </div>
      <p className="text-16px-semibold">🔻 예약 내역</p>
      <div className="flex gap-4">
        <Button
          type="button"
          height="56"
          fullWidth
          radius="4"
          gap="4"
          backgroundColor="black"
          fontStyle="xl">
          후기 작성
        </Button>
      </div>
      <p className="text-16px-semibold">
        🔻 체험 관리, 체험 등록, 내 체험 수정
      </p>
      <div className="flex gap-4">
        <Button
          type="button"
          width="120"
          height="48"
          radius="4"
          gap="4"
          backgroundColor="black"
          fontStyle="xl">
          체험 등록하기
        </Button>
        <Button
          type="button"
          width="120"
          height="48"
          radius="4"
          gap="4"
          backgroundColor="black"
          fontStyle="xl">
          등록하기
        </Button>
        <Button
          type="submit"
          width="120"
          height="48"
          radius="4"
          gap="4"
          backgroundColor="black"
          fontStyle="xl">
          수정하기
        </Button>
      </div>
      <p className="text-16px-semibold">🔻 예약 정보</p>
      <div className="flex gap-4">
        <Button
          type="button"
          width="82"
          height="38"
          radius="6"
          gap="8"
          backgroundColor="black"
          fontStyle="m">
          승인하기
        </Button>
        <Button
          type="button"
          width="82"
          height="38"
          radius="6"
          gap="8"
          backgroundColor="white_black"
          fontStyle="m">
          거절하기
        </Button>
      </div>
      <p className="text-16px-semibold">🔻 알림</p>
      <div className="flex gap-4">
        <form className="flex gap-4">
          <input type="text" className="border" />
          <Button
            type="reset"
            width="82"
            height="38"
            radius="6"
            gap="8"
            backgroundColor="white_black"
            fontStyle="m">
            초기화
          </Button>
        </form>
      </div>
      <Button type="button" width="24" height="24">
        <Close width={24} height={24} className="text-brand-500" />
      </Button>
    </div>
  );
};

export default button;
