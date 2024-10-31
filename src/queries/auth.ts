import { signin, signup } from "@/src/services/auth";
import { useMutation } from "@tanstack/react-query";

/**
 * @description - 회원가입 요청 함수
 * @returns - { mutate, isPending }
 */
export const useSignUp = () => {
  return useMutation({
    mutationFn: signup,
  });
};

/**
 * @description - 로그인 요청 함수
 * @returns - { mutate, isPending }
 */
export const useSignIn = () => {
  return useMutation({
    mutationFn: signin,
  });
};
