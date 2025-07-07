import { BaseException } from './base.exception';

export class ForbiddenException extends BaseException {
  constructor(message: string = 'Acesso negado') {
    super(message, 'FORBIDDEN', 403);
  }
}