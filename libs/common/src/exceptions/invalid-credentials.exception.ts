import { BaseException } from "./base.exception";

export class InvalidCredentialsException extends BaseException {
  constructor(message: string = 'Credenciais inválidas') {
    super(message, 'INVALID_CREDENTIALS', 401);
  }
}