import { User } from "../../user/models/user";
import axios from "axios";
import { isApiSuccess } from "./isApiSuccess";
import { AuthToken } from "src/shared/types/AuthToken";
import { ApiResponse } from "src/shared/types/ApiResponse";

export async function createUserAndLogin(): Promise<string | undefined> {

  const baseURl = process.env.API_TEST + "auth";

  const userBody = {
    email: `john.test${Math.random().toFixed(10)}@domain.com`,
    password: "1234asd!"
  }

  try {
    const response = await axios.post<ApiResponse<User>>(baseURl, userBody);
    if (!isApiSuccess(response.data)) return
  } catch(err) {
    console.log(err)
    return
  }

  try {
    const response = await axios.post<ApiResponse<AuthToken>>(baseURl + "/login", userBody);
    if (!isApiSuccess(response.data)) return
    return response.data.data.token;
  } catch(err) {
    console.log(err)
    return
  }
}