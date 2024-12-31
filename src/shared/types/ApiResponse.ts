import { ZodError } from "zod"
import { HttpException } from "../errors/HttpException"

export type ApiResponse<D> = SuccessResponse<D> | ErrorResponse

export type SuccessResponse<D> = {
  data: D & {id: number},
  message: string
}

export type ErrorResponse = Omit<HttpException, "status"> | ZodError