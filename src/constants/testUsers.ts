import { UserEmail, UserNickName, UserPassword } from "@/src/types/user";

interface TestUserProps extends UserNickName, UserEmail, UserPassword {}

const TEST_USERS: TestUserProps[] = [
  {
    nickname: "example",
    email: "example@email.com",
    password: "password",
  },
  {
    nickname: "codeit",
    email: "codeit@code.it",
    password: "qwerqwer",
  },
  {
    nickname: "test",
    email: "user@code.it",
    password: "user@code.it",
  },
  {
    nickname: "호성효성",
    email: "hosung@hyo.sung",
    password: "hosung@hyo.sung",
  },
  {
    nickname: "미미미영",
    email: "mimi@mi.yong",
    password: "mimi@mi.yong",
  },
  {
    nickname: "하이유리",
    email: "hi@yu.ri",
    password: "hi@yu.ri",
  },
  {
    nickname: "초이주혁",
    email: "choi@ju.hyeok",
    password: "QWER123$",
  },
  {
    nickname: "체험테스트",
    email: "123123123@naver.com",
    password: "123123123Z!",
  },
];

export default TEST_USERS;
