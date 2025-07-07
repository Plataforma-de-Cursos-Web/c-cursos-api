import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const LoggerParam = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.logger || console;
  },
);
