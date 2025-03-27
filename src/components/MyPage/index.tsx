import TwoButtonModal from "../Modal/TwoButtonModal";
import Form from "@/src/components/Form";
import useModalStore from "@/src/stores/useModalStore";
import useUserStore from "@/src/stores/useUserStore";
import type { ComponentProps } from "@/src/types/type";
import type { MyPageProps, UserPatchProps } from "@/src/types/user";

const MyPage = ({
  handleSubmit,
  isPending,
  children,
}: MyPageProps & ComponentProps) => {
  const { userData } = useUserStore();
  const { setModalOpen, setModalClose } = useModalStore();

  const handleUserUpdateConfirm = async (formData: UserPatchProps) => {
    setModalOpen(
      <TwoButtonModal
        onCancel={() => {
          handleSubmit(formData);
          setModalClose();
        }}
        title="내정보를 수정하시겠습니까?"
        negativeContent="취소"
        interactiveContent="확인"
      />,
    );
  };

  if (!userData) return null;

  return (
    <Form
      onSubmit={handleUserUpdateConfirm}
      className="mx-auto w-full max-w-640 pb-48 md:ml-0">
      <Form.Title>내정보</Form.Title>

      {children}

      <Form.Field variant="email">
        <Form.Label>이메일</Form.Label>
        <Form.Input defaultValue={userData.email} readOnly disabled />
      </Form.Field>

      <Form.Field variant="nickname">
        <Form.Label>닉네임</Form.Label>
        <Form.Input
          value={userData.nickname}
          placeholder="닉네임을 입력해 주세요"
        />
      </Form.Field>

      <Form.Field variant="newPassword">
        <Form.Label>비밀번호</Form.Label>
        <Form.Input placeholder="비밀번호를 입력해주세요" />
      </Form.Field>

      <Form.Field variant="confirmPassword">
        <Form.Label>비밀번호 확인</Form.Label>
        <Form.Input placeholder="비밀번호를 한 번 더 입력해주세요" />
      </Form.Field>

      <Form.Field variant="authPage" className="mt-20">
        <Form.SubmitButton disabled={isPending}>수정하기</Form.SubmitButton>
      </Form.Field>
    </Form>
  );
};

export default MyPage;
