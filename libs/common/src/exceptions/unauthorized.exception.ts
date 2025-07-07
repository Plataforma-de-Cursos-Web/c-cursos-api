import { BaseException } from './base.exception';

export class UnauthorizedException extends BaseException {
  constructor(message: string = 'Não autorizado') {
    super(message, 'UNAUTHORIZED', 401);
  }
}