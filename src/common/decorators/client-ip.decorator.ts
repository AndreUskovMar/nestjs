import { createParamDecorator } from '@nestjs/common';
import { IS_DEV_ENV } from '../utils';

export const ClientIpDecorator = createParamDecorator((_: unknown, ctx) => {
  const request = ctx.switchToHttp().getRequest();

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return IS_DEV_ENV
    ? '31.77.254.7'
    : Array.isArray(request.headers['cf-connecting-ip'])
      ? request.headers['cf-connecting-ip'][0]
      : (request.headers['cf-connecting-ip'] ??
        (typeof request.headers['x-forwarded-for'] === 'string'
          ? request.headers['x-forwarded-for'].split(',')[0]
          : request.ip));
});
