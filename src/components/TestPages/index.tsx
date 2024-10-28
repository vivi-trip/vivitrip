import Dropdown from "@/src/components/Dropdown";
import PATH_NAMES from "@/src/constants/pathname";
import { useRouter } from "next/router";

const TEST_PAGES = [
  { path: PATH_NAMES.SignIn, name: "로그인" },
  { path: PATH_NAMES.SignUp, name: "회원가입" },
  { path: PATH_NAMES.Button, name: "버튼컴포넌트 예시" },
  { path: PATH_NAMES.Chip, name: "칩컴포넌트 예시" },
];

const TestPages = () => {
  const router = useRouter();

  return (
    <Dropdown>
      <Dropdown.Trigger className="text-16px-medium text-gray-700 text-nowrap">
        테스트 페이지 바로가기
      </Dropdown.Trigger>
      <Dropdown.Menu className="bottom-full !top-auto mt-0 mb-4">
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
