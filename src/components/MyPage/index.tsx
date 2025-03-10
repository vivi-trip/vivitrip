import Form from "@/src/components/Form";
import useUserStore from "@/src/stores/userStore";
import { MyPageProps } from "@/src/types/user";

const MyPage = ({ handleSubmit, isPending }: MyPageProps) => {
  const { userData } = useUserStore();

  if (!userData) return null;

  return (
    <Form
      onSubmit={handleSubmit}
      className="mx-auto w-full max-w-640 pb-48 md:ml-0">
      <Form.Title>내정보</Form.Title>

      <Form.Field variant="email">
        <Form.Label>이메일</Form.Label>
        <Form.Input value={userData.email} readOnly disabled />
      </Form.Field>

      <Form.Field variant="nickname">
        <Form.Label>닉네임</Form.Label>
        <Form.Input
          value={userData.nickname}
          defaultValue={userData.nickname}
          placeholder="닉네임을 입력해 주세요"
        />
      </Form.Field>

      <Form.Field variant="password">
        <Form.Label>비밀번호</Form.Label>
        <Form.Input placeholder="비밀번호을 입력해주세요" />
      </Form.Field>

      <Form.Field variant="confirmPassword">
        <Form.Label>비밀번호 확인</Form.Label>
        <Form.Input placeholder="비밀번호을 한 번 더 입력해주세요" />
      </Form.Field>

      <Form.Field variant="authPage" className="mt-20">
        <Form.SubmitButton disabled={isPending}>수정하기</Form.SubmitButton>
      </Form.Field>
    </Form>
  );
};

export default MyPage;
