import { Profile } from "src/user/models/profile";
import { createUserAndLogin } from "./createUserAndLogin";
import { ApiResponse } from "src/shared/types/ApiResponse";
import axios from "axios";
import { isApiSuccess } from "./isApiSuccess";

const postURL = process.env.API_TEST + "profile";

export async function createProfile(userToken: string): Promise<Profile | undefined> {

  const profileBody: Profile = {
    first_name: "John",
    surname: "Doe",
    username: `john.doe${Math.random().toFixed(5)}`
  }

  try {
    const response = await axios.post<ApiResponse<Profile & {id: string}>>(postURL, profileBody, {
      headers: {
      Authorization: `Bearer ${userToken}` as string
    }})
    
    if(!isApiSuccess(response.data)) return;
    return response.data.data;
  } catch(err) {
    console.log(err);
    return
  }
}