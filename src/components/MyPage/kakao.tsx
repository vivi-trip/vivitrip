import Button from "@/src/components/Button/Button";
import Form from "@/src/components/Form";
import PopupModal from "@/src/components/Modal/PopupModal";
import TwoButtonModal from "@/src/components/Modal/TwoButtonModal";
import PATH_NAMES from "@/src/constants/pathname";
import { deleteKakaoUser } from "@/src/services/auth";
import useModalStore from "@/src/stores/useModalStore";
import useUserStore from "@/src/stores/useUserStore";
import type { User } from "@/src/types/user";
import { useRouter } from "next/router";

const MyPageKakao = () => {
  const router = useRouter();
  const { userData, clearUser } = useUserStore();
  const { setModalOpen, setModalClose } = useModalStore();

  const disconnectKakaoAccount = async (user: User) => {
    const emailParts = user.email.split("@");

    if (emailParts.length !== 2 || Number.isNaN(Number(emailParts[0]))) {
      throw new Error("유효하지 않은 이메일 형식입니다.");
    }

    const kakaoId = Number(emailParts[0]);

    try {
      await deleteKakaoUser(kakaoId);
      router.replace(PATH_NAMES.Root);
      clearUser();
    } catch (error) {
      setModalOpen(
        <PopupModal title="카카오 계정 연결 해제 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요." />,
      );
    }
  };

  const handleDisconnectKakaoAccount = async () => {
    if (!userData) return;

    setModalOpen(
      <TwoButtonModal
        onCancel={() => {
          disconnectKakaoAccount(userData);
          setModalClose();
        }}
        title="카카오 계정 연결을 끊으시겠습니까?"
        negativeContent="아니오"
        interactiveContent="네"
      />,
    );
  };

  if (!userData) return null;

  return (
    <Form className="mx-auto w-full max-w-640 pb-48 md:ml-0">
      <Form.Title>내정보</Form.Title>

      <Form.Field variant="default">
        <Form.Label>회원번호</Form.Label>
        <Form.Input value={userData.id} readOnly disabled />
      </Form.Field>

      <Form.Field variant="email">
        <Form.Label>이메일</Form.Label>
        <Form.Input value={userData.email} readOnly disabled />
      </Form.Field>

      <Form.Field variant="nickname">
        <Form.Label>닉네임</Form.Label>
        <Form.Input value={userData.nickname} readOnly disabled />
      </Form.Field>

      <Button
        type="button"
        height="56"
        fullWidth
        radius="6"
        fontStyle="l"
        className="mt-20 bg-[#fae100]"
        onClick={handleDisconnectKakaoAccount}>
        카카오 계정 연결 끊기
      </Button>
    </Form>
  );
};

export default MyPageKakao;
