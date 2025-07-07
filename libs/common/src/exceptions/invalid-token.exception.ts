import { BaseException } from "./base.exception";

export class InvalidTokenException extends BaseException {
  constructor(message: string = 'Token inválido') {
    super(message, 'INVALID_TOKEN', 401);
  }
}