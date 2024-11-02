import { UserEmail, UserNickName, UserPassword } from "../types/user";

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
    password: "choi@ju.hyeok",
  },
];

export default TEST_USERS;
