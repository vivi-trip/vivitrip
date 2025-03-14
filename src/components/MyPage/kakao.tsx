import Button from "@/src/components/Button/Button";
import Form from "@/src/components/Form";
import PATH_NAMES from "@/src/constants/pathname";
import { deleteKakaoUser } from "@/src/services/auth";
import useUserStore from "@/src/stores/userStore";
import { useRouter } from "next/router";

const MyPageKakao = () => {
  const router = useRouter();
  const { userData, clearUser } = useUserStore();

  const handleDisconnectKakaoAccount = async () => {
    if (!userData) return;

    /**
     * @todo
     * 커스텀 모달로 변경
     */
    // eslint-disable-next-line no-restricted-globals, no-alert
    const answer = confirm("카카오 계정 연결을 끊으시겠습니까?");

    if (!answer) return;

    const kakaoId = Number(userData.email.split("@")[0]);

    try {
      await deleteKakaoUser(kakaoId);
      clearUser();
      router.replace(PATH_NAMES.Root);
    } catch (error) {
      /**
       * @todo
       * 커스텀 모달로 변경
       */
      // eslint-disable-next-line no-console
      console.error("카카오 계정 연결 해제 중 오류가 발생했습니다: ", error);
    }
  };

  if (!userData) return null;

  return (
    <Form
      onSubmit={() => false}
      className="mx-auto w-full max-w-640 pb-48 md:ml-0">
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
