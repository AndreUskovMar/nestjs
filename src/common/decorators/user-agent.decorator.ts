import { createParamDecorator } from '@nestjs/common';

export const UserAgentDecorator = createParamDecorator((_: unknown, req) => {
  const request = req.switchToHttp().getRequest();

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return request.headers['user-agent'];
});
