import { BaseException } from "./base.exception";

export class UserAlreadyExistsException extends BaseException {
    constructor(message: string = 'Usuário já existe', email: string) {
        message = `${message}: ${email}`;
        super(message, 'USER_ALREADY_EXISTS', 409);
    }
}