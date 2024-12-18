export class HttpException extends Error {
  public readonly code: number;
  public readonly name: string;

  constructor(name: string, message: string, code: number) {
    super(message);
    this.code = code;
    this.name = name;
    Object.setPrototypeOf(this, HttpException.prototype);
    Error.captureStackTrace(this, this.constructor);
  }
} 