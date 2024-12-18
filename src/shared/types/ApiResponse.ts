import { HttpException } from "@shared/errors/HttpException"
import { ZodError } from "zod"

export type ApiResponse<D> = SuccessResponse<D> | ErrorResponse

export type SuccessResponse<D> = {
  data: D & {id: number},
  message: string
}

export type ErrorResponse = Omit<HttpException, "status"> | ZodError