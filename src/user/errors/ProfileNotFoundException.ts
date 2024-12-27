import { HttpException } from "../../shared/errors/HttpException";
import {HttpStatus} from "../../shared/errors/HttpStatus";

export class ProfileNotFoundException extends HttpException {
  constructor() {
    super(
      "ProfileNotFoundException", 
      "The searched profile was not found.", 
      HttpStatus.NOT_FOUND
    )
  }
}