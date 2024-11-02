import api from "./axios";
import { SignInProps, SignUpProps } from "@/src/types/user";

export const signup = async (param: SignUpProps) => {
  const response = await api.post("users", param);
  return response;
};

export const signin = async (param: SignInProps) => {
  const response = await api.post("/auth/login", param);
  return response;
};
