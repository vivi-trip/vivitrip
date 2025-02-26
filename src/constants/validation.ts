import { InputKeys } from "@/src/types/form";

interface ValidationRule {
  required?: string;
  pattern?: {
    value: RegExp;
    message: string;
  };
  minLength?: {
    value: number;
    message: string;
  };
  validate?: (value: string) => boolean | string;
}

const validationRules = (
  watch: (field: string) => string,
): Record<InputKeys, ValidationRule> => ({
  email: {
    required: "이메일을 입력해주세요.",
    pattern: {
      value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
      message: "잘못된 이메일입니다.",
    },
  },
  password: {
    required: "비밀번호를 입력해주세요.",
    minLength: {
      value: 8,
      message: "비밀번호는 최소 8자 이상이어야 합니다.",
    },
    pattern: {
      value: /^(?=.*[A-Z])(?=.*[!@#$%^&*])/,
      message:
        "비밀번호에 최소 하나의 대문자와 하나의 특수문자가 포함되어야 합니다.",
    },
  },
  confirmPassword: {
    required: "비밀번호를 한번 더 입력해주세요.",
    validate: (value: string) =>
      value === watch("password") || "비밀번호가 일치하지 않습니다.",
  },
  nickname: {
    required: "닉네임을 입력해주세요.",
    minLength: {
      value: 2,
      message: "닉네임은 최소 2자 이상이어야 합니다.",
    },
  },
  calendar: {},
  search: {},
  default: {},
});

export default validationRules;
