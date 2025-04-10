import Dropdown from "@/src/components/Dropdown";
import PATH_NAMES from "@/src/constants/pathname";
import { useRouter } from "next/router";

const TEST_PAGES = [
  { path: PATH_NAMES.SignIn, name: "로그인" },
  { path: PATH_NAMES.SignUp, name: "회원가입" },
  { path: PATH_NAMES.KakaoAdmin, name: "카카오 계정 연결끊기" },
  { path: PATH_NAMES.Button, name: "버튼컴포넌트 예시" },
  { path: PATH_NAMES.Chip, name: "칩컴포넌트 예시" },
  { path: PATH_NAMES.Activity, name: "체험 상세페이지" },
  { path: PATH_NAMES.Form, name: "FORM 예시페이지" },
];

const TestPages = () => {
  const router = useRouter();

  return (
    <Dropdown>
      <Dropdown.Trigger className="font-16px-medium text-nowrap text-white">
        테스트 페이지 바로가기
      </Dropdown.Trigger>
      <Dropdown.Menu className="!top-auto bottom-full mb-4 mt-0">
        {TEST_PAGES.map(({ path, name }) => {
          return (
            <Dropdown.Item
              key={`test_pages_${path}_${name}`}
              onClick={() => router.push(path)}>
              {name}
            </Dropdown.Item>
          );
        })}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default TestPages;
