import PATH_NAMES from "@/src/constants/pathname";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export const config = {
  matcher: [
    // 로그인, 회원가입 페이지 (로그인된 사용자는 접근 불가)
    "/sign-in",
    "/sign-in/:path*",
    "/sign-up",
    // 인증이 필요한 페이지 (로그인하지 않은 사용자는 접근 불가)
    "/my-activities",
    "/my-activities/:path*",
    "/my-page",
    "/my-reservations",
    "/reservation-history",
  ],
};

export async function middleware(request: NextRequest) {
  // 현재 요청 경로
  const { pathname } = request.nextUrl;
  // 액세스 토큰 가져오기
  const accessToken = request.cookies.get("accessToken");
  // 리프레시 토큰 가져오기
  const refreshToken = request.cookies.get("refreshToken");

  // 로그인 및 회원가입 페이지 여부
  const isAuthPage =
    pathname.startsWith("/sign-in") || pathname.startsWith("/sign-up");
  // 인증이 필요한 페이지 여부
  const isProtectedPage = [
    "/my-activities",
    "/my-page",
    "/my-reservations",
    "/reservation-history",
  ].some((route) => pathname.startsWith(route));

  // 로그인된 상태에서 로그인/회원가입 페이지 접근 시 루트로 리다이렉트
  if (isAuthPage && (accessToken || refreshToken)) {
    return NextResponse.redirect(new URL(PATH_NAMES.Root, request.url));
  }

  // 로그인되지 않은 상태에서 인증이 필요한 페이지 접근 시 루트로 리다이렉트
  if (isProtectedPage && (!accessToken || !refreshToken)) {
    return NextResponse.redirect(new URL(PATH_NAMES.Root, request.url));
  }

  // 위 예외 상황이 아닐 경우 일반 응답
  return NextResponse.next();
}
