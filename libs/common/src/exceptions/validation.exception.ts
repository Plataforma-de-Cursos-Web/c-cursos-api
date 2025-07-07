import { BaseException } from './base.exception';

export class ValidationException extends BaseException {
  constructor(message: string, data?: any) {
    super(message, 'VALIDATION_ERROR', 400, data);
  }
}