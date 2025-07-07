import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const NatsService = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.natsService;
  },
);
