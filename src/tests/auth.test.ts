import {describe,expect,it} from "vitest";
import axios, { Axios, AxiosError, AxiosResponse, isAxiosError } from "axios";
import 'dotenv/config'
import {User} from "../user/models/user"
import { ApiResponse, ErrorResponse, SuccessResponse } from "../shared/types/ApiResponse";
import { AuthToken } from "@shared/types/AuthToken";

function isApiSuccess<D>(obj: any): obj is SuccessResponse<D> {
  return obj && obj.data && obj.message
}

describe("Route POST /auth", () => {

  const postURL = process.env.API_TEST + "auth";

  it("Creating a user successfully", async () => {
    const userBody = {
      email: `john.test${Math.random().toFixed(10)}@domain.com`,
      password: "1234asd!"
    }

    try {
      const response = await axios.post<ApiResponse<User & {id: string}>>(postURL, userBody)

      if (!isApiSuccess(response.data)) return

      expect(response.status).toBe(201)
      expect(response.data.data.id).toBeDefined()
      expect(response.data.data.email).toBe(userBody.email)

    } catch (error) {
      console.log(error)
      expect(true).toBe(false)
    }

  })

  it("Fail to create a user with invalid password", async () => {
    const userBody = {
      email: `john.test${Math.random().toFixed(10)}@domain.com`,
      password: "123asd"
    }

    try {
      const _ = await axios.post<ApiResponse<User & {id: string}>>(postURL, userBody);
      expect(true).toBe(false);
    } catch(error) {
      if(!(error instanceof AxiosError)) return;
      if(!isAxiosError(error.response?.data)) return;

      expect(error.status).toBe(400);
      expect(error.response.data.name).toBe("ValidationError");
    }

  })

  it("Fail to create a user with a email that alrealdy exist", async () => {
    const userBody = {
      email: `john.test${Math.random().toFixed(10)}@domain.com`,
      password: "1234asd!"
    }

    const _ = await axios.post<ApiResponse<User & {id: string}>>(postURL, userBody);

    try {
      const _ = await axios.post<ApiResponse<User & {id: string}>>(postURL, userBody);
      expect(true).toBe(false);
    } catch(error) {
      if(!(error instanceof AxiosError)) return;
      if(!isAxiosError(error.response?.data)) return;

      expect(error.status).toBe(400);
      expect(error.response.data.name).toBe("EmailAlrealdyUsedException");
    }
  })

  it("Login successfully", async () => {
    const userBody = {
      email: `john.test${Math.random().toFixed(10)}@domain.com`,
      password: "1234asd!"    
    }

    const userResponse = await axios.post<ApiResponse<User & {id: string}>>(postURL, userBody);

    if(!isApiSuccess(userResponse.data)) return expect(true).toBe(false);

    const loginResponse = await axios.post<ApiResponse<AuthToken>>(postURL + "/login", userBody);

    if(!isApiSuccess(loginResponse.data)) return expect(true).toBe(false);

    expect(loginResponse.status).toBe(200);
    expect(loginResponse.data.data.token).toBeDefined();
  })

})


