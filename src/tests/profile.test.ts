import {describe,expect,it} from "vitest";
import axios, { Axios, AxiosError, AxiosResponse, isAxiosError } from "axios";
import 'dotenv/config'
import { ApiResponse, ErrorResponse, SuccessResponse } from "../shared/types/ApiResponse";
import { createUserAndLogin } from "./utils/createUserAndLogin";
import { isApiSuccess } from "./utils/isApiSuccess";
import { Profile } from "src/user/models/profile";
import { createProfile } from "./utils/createProfile";

describe("Route POST /profile", () => {

  const postURL = process.env.API_TEST + "profile";

  it("Creating a profile successfully", async () => {
    const userToken = await createUserAndLogin();

    expect(userToken).toBeDefined();

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
      
      const profile = response.data.data;

      expect(response.status).toBe(201);
      expect(profile).toMatchObject(profileBody);

    } catch(err) {
      expect(true).toBe(false)
    }

  })


})

describe("Route GET /profile/me ", () => {

  const url = process.env.API_TEST + "profile/me"

  it("Get logged user profile", async () => {
    const userToken = await createUserAndLogin();

    if(!userToken) {
      expect(userToken).toBeDefined();
      return
    }

    const profile = await createProfile(userToken);

    if(!profile) {
      expect(profile).toBeDefined();
      return
    }
    
    try {
      const response = await axios.get<ApiResponse<Profile>>(url,{
        headers: {
        Authorization: `Bearer ${userToken}` as string
      }})
      if(!isApiSuccess(response.data)) return;
      
      const loggedProfile = response.data.data;

      expect(response.status).toBe(200);
      expect(profile).toMatchObject(loggedProfile);

    } catch(err) {
      expect(true).toBe(false)
    }

  })

})

describe("Route GET /profile/:username", () => {
  const url = process.env.API_TEST + "profile/"

  it("Get profile by username successfully", async () => {
    const userToken = await createUserAndLogin();

    if(!userToken) {
      expect(userToken).toBeDefined();
      return
    }

    const profile = await createProfile(userToken);

    if(!profile) {
      expect(profile).toBeDefined();
      return
    }
    
    try {
      const response = await axios.get<ApiResponse<Profile>>(url + profile.username,{
        headers: {
        Authorization: `Bearer ${userToken}` as string
      }})
      
      if(!isApiSuccess(response.data)) return;

      const responseProfile = response.data.data;

      expect(response.status).toBe(200);
      expect(profile).toMatchObject(responseProfile);

    } catch(err) {
      expect(true).toBe(false)
    }

  })
})


