import api from "./axios";
import { SignInProps, SignUpProps } from "@/src/types/user";

export const signup = (param: SignUpProps) => api.post("users", param);

export const signin = (param: SignInProps) => api.post("/auth/login", param);
