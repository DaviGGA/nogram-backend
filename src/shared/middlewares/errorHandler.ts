import { unknown, ZodError } from "zod";
import { HttpException } from "../../shared/errors/HttpException";
import { Context, Next } from "koa";
import { HttpStatus } from "../../shared/errors/HttpStatus";

type KoaJwtError = {
  name: string,
  status: number;
  message: string;
  originalError?: Error; 
};

function isKoaJwtError(err: any): err is KoaJwtError {
  return err && typeof err.status === "number" && typeof err.message === "string" && typeof err.name == "string";
} 

export async function errorHandler(ctx: Context, next: Next) {
  try {
    await next()
  } catch(error: any) {
    
    console.log(error);

    if (isKoaJwtError(error)) { 
      ctx.status = HttpStatus.UNAUTHORIZED;
      ctx.body = {
        name: error.name,
        message: error.originalError ? error.originalError.message : error.message
      }
      return
    }


    if (error instanceof HttpException) {
      ctx.status = error.code || HttpStatus.INTERNAL_SERVER_ERROR;
      ctx.body = {
        name: error.name,
        message: error.message
      }
      return
    }

    if (error instanceof ZodError) {
      ctx.status = HttpStatus.BAD_REQUEST
      ctx.body = {
        name: "ValidationError",
        issues: error.issues.map(issue => ({
          path: issue.path,
          message: issue.message
        }))
      }
      return
    }

    ctx.status = 500;
    ctx.body = {
      name: "InternalServerError",
      message: "Something went wrong"
    };
  }
}