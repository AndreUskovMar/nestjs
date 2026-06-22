import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infra/prisma/prisma.service';
import { UAParser } from 'ua-parser-js';
import { lookup } from 'geoip-country';

@Injectable()
export class StatisticsService {
  private readonly parser: UAParser;
  constructor(private readonly prismaService: PrismaService) {
    this.parser = new UAParser();
  }

  async getBrowserStats(id: string) {
    const clicks = await this.getClicks(id);

    return clicks.reduce((acc, click) => {
      const { browser } = this.getBrowserByUserAgent(click.userAgent);

      if (acc[browser]) {
        acc[browser] += 1;
      } else {
        acc[browser] = 1;
      }

      return acc;
    }, {});
  }

  async getCountryStats(id: string) {
    const clicks = await this.getClicks(id);

    return clicks.reduce((acc, click) => {
      const { country } = this.getCountryByIp(click.ipAddress);

      if (acc[country]) {
        acc[country] += 1;
      } else {
        acc[country] = 1;
      }

      return acc;
    }, {});
  }

  async getClicks(linkId: string) {
    return this.prismaService.click.findMany({
      where: {
        linkId,
      },
    });
  }

  private getBrowserByUserAgent(userAgent: string) {
    this.parser.setUA(userAgent);

    const result = this.parser.getResult();

    return { browser: result.browser.name ?? '' };
  }

  private getCountryByIp(ipAddress: string) {
    const geo = lookup(ipAddress);

    console.log(JSON.stringify(geo));

    return { country: geo?.country ?? 'Russia' };
  }
}
