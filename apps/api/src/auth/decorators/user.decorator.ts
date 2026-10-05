import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { type User as AuthenticatedUser } from '../create-auth';
import { Request } from 'express';

export const User = createParamDecorator(
  (data: keyof AuthenticatedUser | undefined, ctx: ExecutionContext) => {
    const request: Request & { user: AuthenticatedUser } = ctx
      .switchToHttp()
      .getRequest();
    const user = request.user;

    return data ? user?.[data] : user;
  },
);
