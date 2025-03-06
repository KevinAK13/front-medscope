import apiRequest from "@/lib/utils/apiRequest";

export const registerUser = async (userData: {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  phone_number: string;
}) => {
  return await apiRequest.post("/auth/register", userData);
};