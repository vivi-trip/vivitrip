import Form from "@/src/components/Form";

/* 각 유효성 검사 항목에 맞게 설정 variant와 동일하게 해주시면 됩니다. 예를 들어 검색시는 search: string으로 */
interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
  nickname: string;
}

const FormPage = () => {
  const onSubmit = (data: FormData) => {
    console.log("데이터 확인", data);
  };

  return (
    <section className="m-100 flex flex-col space-y-100">
      {/* 로그인/회원가입 페이지 */}
      <Form onSubmit={onSubmit} className="m-auto flex w-480">
        <Form.Label>
          닉네임
          <Form.Input variant="nickname" placeholder="닉네임을 입력해 주세요" />
        </Form.Label>

        <Form.Label>
          이메일
          <Form.Input variant="email" placeholder="이메일을 입력해 주세요" />
        </Form.Label>

        <Form.Label>
          비밀번호
          <Form.Input variant="password" placeholder="8자 이상 입력해 주세요" />
        </Form.Label>

        <Form.Label>
          비밀번호 확인
          <Form.Input
            variant="confirmPassword"
            placeholder="비밀번호를 한번 더 입력해 주세요"
          />
        </Form.Label>

        <Form.SubmitButton variant="authPage">회원가입</Form.SubmitButton>
      </Form>

      {/* 내 정보 페이지 */}
      <Form onSubmit={onSubmit} className="">
        <Form.Title>
          내 정보
          <Form.SubmitButton variant="expPage">저장하기</Form.SubmitButton>
        </Form.Title>

        <Form.Label className="text-24px-bold">
          닉네임
          <Form.Input
            variant="nickname"
            placeholder="닉네임을 입력해주세요"
            value="안녕"
          />
        </Form.Label>

        <Form.Label className="text-24px-bold">
          이메일
          <Form.Input
            readOnly
            variant="email"
            placeholder="이메일을 입력해주세요"
            value="email@email.com"
          />
        </Form.Label>

        <Form.Label className="text-24px-bold">
          비밀번호
          <Form.Input variant="password" placeholder="8자 이상 입력해 주세요" />
        </Form.Label>

        <Form.Label className="text-24px-bold">
          비밀번호 재입력
          <Form.Input
            variant="confirmPassword"
            placeholder="비밀번호를 한번 더 입력해 주세요"
          />
        </Form.Label>
      </Form>

      {/* textarea 예시 */}
      <Form onSubmit={onSubmit} className="m-auto flex w-792">
        <Form.Label className="text-24px-bold">
          내용
          <Form.Input
            as="textarea" // 인풋은 필요없으나 textarea로 할 때 필요
            variant="default" // 유효성 검사가 필요없는 경우
            placeholder="내용을 입력해주세요"
            value="내용입니다"
          />
        </Form.Label>
      </Form>

      {/* 검색 예시 */}
      <Form
        onSubmit={onSubmit}
        className="m-auto flex w-1152"
        // resetOnSubmit  미설정시 자동으로 입력값 초기화 됨. 검색은 초기화 불필요해서 false로 설정 필요
        // 검색 시 placeholder 대신 Input의 라벨 기능을 사용함
        resetOnSubmit={false}>
        <Form.Label className="text-24px-bold">
          무엇을 체험하고 싶으신가요?
          <div className="mt-32 flex items-center gap-12">
            <Form.Input label="내가 원하는 체험은" variant="search" />
            <Form.SubmitButton variant="search">검색하기</Form.SubmitButton>
          </div>
        </Form.Label>
      </Form>
    </section>
  );
};

export default FormPage;
