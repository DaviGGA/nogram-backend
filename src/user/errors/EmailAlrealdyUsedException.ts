import { HttpException } from "../../shared/errors/HttpException";
import {HttpStatus} from "../../shared/errors/HttpStatus";

export class EmailAlrealdyUsedException extends HttpException {
  constructor() {
    super("EmailAlrealdyUsedException", "User email alrealdy used.", HttpStatus.BAD_REQUEST)
  }
}