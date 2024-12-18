import { HttpException } from "../../shared/errors/HttpException";
import {HttpStatus} from "../../shared/errors/HttpStatus";

export class PasswordMismatchException extends HttpException {
  constructor() {
    super(
      "PasswordMismatchException", 
      "The password you provided doesn't match with found user password.", 
      HttpStatus.BAD_REQUEST
    )
  }
}