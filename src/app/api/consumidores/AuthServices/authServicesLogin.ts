import apiRequest from "@/lib/utils/apiRequest";

interface LoginUserData {
  email?: string;
  phone?: string;
  password: string;
}

export const loginUser = async (userData: LoginUserData) => {
  return await apiRequest.post("/auth/login", userData);
};