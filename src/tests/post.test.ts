import {describe,expect,it} from "vitest";
import axios, { Axios, AxiosError, AxiosResponse, isAxiosError } from "axios";
import 'dotenv/config'
import { ApiResponse, ErrorResponse, SuccessResponse } from "../shared/types/ApiResponse";
import { createUserAndLogin } from "./utils/createUserAndLogin";
import { isApiSuccess } from "./utils/isApiSuccess";
import fs from "fs/promises"
import { Post } from "src/post/models/Post";

describe("Route POST /post", () => {

  const url = process.env.API_TEST + "post";

  it("Creating a post successfully", async () => {
    const userToken = await createUserAndLogin();

    if(!userToken) {
      expect(userToken).toBeDefined();
      return
    }

    const image = await fs.readFile("./src/shared/assets/test-post-image.jpg")

    const formData = new FormData();

    formData.append("description", "Cool desc");
    formData.append("image", new Blob([image]))


    try {
      const response = await axios.post<ApiResponse<Post>>(url, formData,{
        headers: {
          Authorization: `Bearer ${userToken}` as string
        },
        
       })

      expect(response.status).toBe(201)
    } catch(err) {
      console.log(err)
      expect(true).toBe(false)
    }

  })


})

describe("Route GET /post/feed" , () => {
  const url = process.env.API_TEST + "post/feed";

  it("Getting user feed succesfully", async () => {
    const userToken = await createUserAndLogin();

    if(!userToken) {
      expect(userToken).toBeDefined();
      return
    }

    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${userToken}`
        }
      })

      expect(response.data).toBeDefined();
      expect(response.status).toBe(200);
    } catch(error) {
      console.log(error);
      expect(true).toBe(false);
    }
  })

  
})



