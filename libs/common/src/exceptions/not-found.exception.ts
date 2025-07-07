import { BaseException } from './base.exception';

export class NotFoundException extends BaseException {
  constructor(message: string = 'Recurso não encontrado') {
    super(message, 'NOT_FOUND', 404);
  }
}