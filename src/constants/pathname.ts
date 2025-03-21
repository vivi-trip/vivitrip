import { PathNameType, TestPagePathNameType } from "@/src/types/pathname";

const PATH_NAMES: Record<PathNameType | TestPagePathNameType, string> = {
  Root: "/",
  SignIn: "/sign-in",
  SignUp: "/sign-up",
  KakaoAdmin: "/oauth/kakao/admin",
  MyPage: "/my-page",
  PrivacyPolicy: "/privacy-policy",
  FAQ: "/faq",
  Chip: "/chip",
  Button: "/button",
  Form: "/Form",
  KakaoSignIn: `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}&redirect_uri=${process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI}/sign-in`,
  KakaoSignUp: `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}&redirect_uri=${process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI}/sign-up`,
  Activity: `/activity`,
  MyActivities: `/my-activities`,
  MyActivitiesRegistration: `/my-activities/registration`,
  MyReservations: `/my-reservations`,
  ReservationHistory: `/reservation-history`,
};

export default PATH_NAMES;
