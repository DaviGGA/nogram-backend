import { SuccessResponse } from "src/shared/types/ApiResponse";

export function isApiSuccess<D>(obj: any): obj is SuccessResponse<D> {
  return obj && obj.data && obj.message
}