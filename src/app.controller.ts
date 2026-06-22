import { Controller, Get, Param, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags } from '@nestjs/swagger';
import type { Response } from 'express';
import { ClientIpDecorator, UserAgentDecorator } from './common/decorators';

@ApiTags('App')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get(':code')
  async getLinkByShortCode(
    @Param('code') code: string,
    @Res({ passthrough: true }) res: Response,
    @ClientIpDecorator() clientIp: string,
    @UserAgentDecorator() userAgent: string,
  ) {
    const link = await this.appService.getLinkByShortCode(code);
    console.log('Link: ', link.shortCode);

    await this.appService.trackLink(link.shortCode, clientIp, userAgent);

    res.redirect(link.originalUrl);
  }
}
