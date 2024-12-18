import { HttpException } from "../../shared/errors/HttpException";
import {HttpStatus} from "../../shared/errors/HttpStatus";

export class UserNotFoundException extends HttpException {
  constructor() {
    super(
      "UserNotFoundException", 
      "The searched user was not found.", 
      HttpStatus.NOT_FOUND
    )
  }
}