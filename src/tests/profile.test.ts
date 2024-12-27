import {describe,expect,it} from "vitest";
import axios, { Axios, AxiosError, AxiosResponse, isAxiosError } from "axios";
import 'dotenv/config'
import { ApiResponse, ErrorResponse, SuccessResponse } from "../shared/types/ApiResponse";
import { createUserAndLogin } from "./utils/createUserAndLogin";
import { Profile } from "@user/models/profile";
import { isApiSuccess } from "./utils/isApiSuccess";

describe("Route POST /profile", () => {

  const postURL = process.env.API_TEST + "profile";

  it("Creating a profile successfully", async () => {
    const userToken = await createUserAndLogin();

    expect(userToken).toBeDefined();

    const profileBody: Profile = {
      first_name: "John",
      surname: "Doe",
      username: "john.doe"
    }

    try {
      const response = await axios.post<ApiResponse<Profile & {id: string}>>(postURL, profileBody, {
        headers: {
        Authorization: `Bearer ${userToken}` as string
      }})
      if(!isApiSuccess(response.data)) return;
      
      const profile = response.data.data;

      expect(response.status).toBe(201);
      expect(profile).toMatchObject(profileBody);

    } catch(err) {
      expect(true).toBe(false)
    }

  })


})


