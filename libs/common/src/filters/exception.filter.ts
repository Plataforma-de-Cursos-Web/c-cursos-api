import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { BaseException } from '../exceptions/base.exception';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Erro interno do servidor';
    let code = 'INTERNAL_SERVER_ERROR';
    let data = null;

    // Tratar exceções customizadas que herdam de BaseException
    if (exception instanceof BaseException) {
      status = exception.statusCode;
      message = exception.message;
      code = exception.code;
      data = exception.data;
    } 
    // Tratar HttpException do NestJS
    else if (exception instanceof HttpException) {
      status = exception.getStatus();
      const response = exception.getResponse();
      
      if (typeof response === 'string') {
        message = response;
      } else if (typeof response === 'object' && response !== null) {
        message = (response as any).message || message;
        code = (response as any).error || 'HTTP_EXCEPTION';
      }
    }
    // Tratar erros genéricos
    else if (exception instanceof Error) {
      message = exception.message || message;
      code = 'GENERIC_ERROR';
    }

    const errorResponse = {
      success: false,
      error: {
        code,
        message,
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
        method: request.method,
        ...(data !== null && typeof data === 'object' ? { data } : {}),
      },
    };

    response.status(status).json(errorResponse);
  }
}