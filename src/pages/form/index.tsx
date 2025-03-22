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
    // eslint-disable-next-line no-console
    console.log("데이터 확인", data);
  };

  return (
    <section className="m-100 flex flex-col space-y-100">
      <Form onSubmit={() => {}} className="m-auto flex w-480">
        <Form.Title>움직이는 레이블</Form.Title>

        <Form.Field variant="default">
          <Form.Input label="움직이는 레이블" />
        </Form.Field>

        <Form.Field variant="calendar">
          <Form.Input label="날짜를 선택해주세요." />
        </Form.Field>
      </Form>

      {/* 로그인/회원가입 페이지 */}
      <Form onSubmit={onSubmit} className="m-auto flex w-480">
        <Form.Title>회원가입</Form.Title>

        <Form.Field variant="nickname">
          <Form.Label>닉네임</Form.Label>
          <Form.Input placeholder="닉네임을 입력해 주세요" />
        </Form.Field>

        <Form.Field variant="email">
          <Form.Label>이메일</Form.Label>
          <Form.Input placeholder="이메일을 입력해 주세요" />
        </Form.Field>

        <Form.Field variant="password">
          <Form.Label>비밀번호</Form.Label>
          <Form.Input placeholder="8자 이상 입력해 주세요" />
        </Form.Field>

        <Form.Field variant="confirmPassword">
          <Form.Label>비밀번호 확인</Form.Label>
          <Form.Input placeholder="비밀번호를 한번 더 입력해 주세요" />
        </Form.Field>

        <Form.Field variant="authPage">
          <Form.SubmitButton>회원가입</Form.SubmitButton>
        </Form.Field>
      </Form>

      {/* 내 정보 페이지 */}
      <Form onSubmit={onSubmit} className="m-auto w-792">
        <Form.Field variant="expPage">
          <Form.Title>내 정보</Form.Title>
          <Form.SubmitButton>저장하기</Form.SubmitButton>
        </Form.Field>

        <Form.Field variant="nickname">
          <Form.Label className="font-24px-bold">닉네임</Form.Label>
          <Form.Input placeholder="닉네임을 입력해주세요" value="안녕" />
        </Form.Field>

        <Form.Field variant="email">
          <Form.Label className="font-24px-bold">이메일</Form.Label>
          <Form.Input
            readOnly
            placeholder="이메일을 입력해주세요"
            value="email@email.com"
          />
        </Form.Field>

        <Form.Field variant="password">
          <Form.Label className="font-24px-bold">비밀번호</Form.Label>
          <Form.Input placeholder="8자 이상 입력해 주세요" />
        </Form.Field>

        <Form.Field variant="confirmPassword">
          <Form.Label className="font-24px-bold">비밀번호 재입력</Form.Label>
          <Form.Input placeholder="비밀번호를 한번 더 입력해 주세요" />
        </Form.Field>
      </Form>

      {/* textarea 예시 */}
      <Form onSubmit={onSubmit} className="m-auto flex w-792">
        {/* 유효성 검사가 필요없는 경우 variant="default" */}
        <Form.Field variant="default">
          <Form.Label className="font-24px-bold">내용</Form.Label>
          <Form.Input
            as="textarea" // 인풋은 필요없으나 textarea로 할 때 필요
            placeholder="내용을 입력해주세요"
            value="내용입니다"
          />
        </Form.Field>
      </Form>

      {/* 검색 예시 */}
      <Form
        onSubmit={onSubmit}
        className="m-auto flex w-1152"
        // resetOnSubmit  미설정시 자동으로 입력값 초기화 됨. 검색은 초기화 불필요해서 false로 설정 필요
        // 검색 시 placeholder 대신 Input의 라벨 기능을 사용함
        resetOnSubmit={false}>
        <Form.Field variant="search">
          <Form.Label className="font-24px-bold">
            무엇을 체험하고 싶으신가요?
          </Form.Label>
          <div className="flex items-end gap-8">
            <Form.Input label="내가 원하는 체험은" />
            <Form.SubmitButton>검색하기</Form.SubmitButton>
          </div>
        </Form.Field>
      </Form>
    </section>
  );
};

export default FormPage;
