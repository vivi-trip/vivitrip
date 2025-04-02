import { UserEmail, UserNickName, UserPassword } from "@/src/types/user";

interface TestUserProps extends UserNickName, UserEmail, UserPassword {}

const TEST_USERS: TestUserProps[] = [
  {
    nickname: "테스트계정1",
    email: "lee@test.com",
    password: "!ASDF12345",
  },
  {
    nickname: "테스트계정2",
    email: "123123123@naver.com",
    password: "123123123Z!",
  },
  {
    nickname: "테스트계정3",
    email: "hosung@hyo.sung",
    password: "hosung@hyo.sung",
  },
  {
    nickname: "테스트계정4",
    email: "mimi@mi.yong",
    password: "mimi@mi.yong",
  },
  {
    nickname: "테스트계정5",
    email: "hi@yu.ri",
    password: "hi@yu.ri",
  },
  {
    nickname: "테스트계정6",
    email: "choi@ju.hyeok",
    password: "QWER123$",
  },
];

export default TEST_USERS;
