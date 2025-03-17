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
  maxLength?: {
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
      message: "이메일 형식으로 입력해 주세요.",
    },
  },
  password: {
    required: "비밀번호를 입력해주세요.",
    minLength: {
      value: 8,
      message: "8자 이상 입력해주세요.",
    },
    pattern: {
      value: /^(?=.*[A-Z])(?=.*[!@#$%^&*])/,
      message: "대문자, 특수 문자를 반드시 포함해야 합니다.",
    },
  },
  newPassword: {
    required: "비밀번호를 입력해주세요.",
    minLength: {
      value: 8,
      message: "8자 이상 입력해주세요.",
    },
    pattern: {
      value: /^(?=.*[A-Z])(?=.*[!@#$%^&*])/,
      message: "대문자, 특수 문자를 반드시 포함해야 합니다.",
    },
  },
  confirmPassword: {
    required: "비밀번호를 한번 더 입력해주세요.",
    validate: (value: string) =>
      value === watch("password") ||
      value === watch("newPassword") ||
      "비밀번호가 일치하지 않습니다.",
  },
  nickname: {
    required: "닉네임을 입력해주세요.",
    minLength: {
      value: 2,
      message: "2자 이상 입력해주세요.",
    },
    maxLength: {
      value: 10,
      message: "10자 이하로 입력해주세요.",
    },
  },
  calendar: {},
  search: {},
  default: {},
});

export default validationRules;
