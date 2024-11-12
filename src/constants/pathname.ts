import { PathNameType, TestPagePathNameType } from "../types/pathname";

const PATH_NAMES: Record<PathNameType | TestPagePathNameType, string> = {
  Root: "/",
  SignIn: "/sign-in",
  SignUp: "/sign-up",
  MyPage: "/my-page",
  PrivacyPolicy: "/privacy-policy",
  FAQ: "/faq",
  Chip: "/chip",
  Button: "/button",
};

export default PATH_NAMES;
