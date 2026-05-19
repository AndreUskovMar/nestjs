import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { AppService } from './app.service';
import { StringToLowerCasePipe } from './common/pipes/string-to-lowercase.pipe';
import { AuthGuard } from './common/guards/auth.guard';
import { UserAgentDecorator } from './common/decorators/user-agent.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UsePipes(StringToLowerCasePipe)
  @Post()
  create(@Body('title') title: string) {
    return `Movie: ${title}`;
  }

  @UseGuards(AuthGuard)
  // @UseInterceptors(ResponseInterceptor)
  @Get('@me')
  getProfile(@UserAgentDecorator() userAgent: string) {
    return {
      id: 1,
      name: 'Andre',
      email: 'andre@gmail.com',
      userAgent,
    };
  }
}
