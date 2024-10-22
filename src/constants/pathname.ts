import { PathNameType, TestPagePathNameType } from "../types/pathname";

const PATH_NAMES: Record<PathNameType | TestPagePathNameType, string> = {
  Root: "/",
  SignIn: "/sign-in",
  SignUp: "/sign-up",
  PrivacyPolicy: "/privacy-policy",
  FAQ: "/faq",
  Chip: "/chip",
};

export default PATH_NAMES;
