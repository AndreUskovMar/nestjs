import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression, Interval, Timeout } from '@nestjs/schedule';

@Injectable()
export class TaskService {
  private readonly logger = new Logger(TaskService.name);

  @Cron(CronExpression.EVERY_30_SECONDS)
  handleCron() {
    this.logger.log('Running cron job every 30 seconds');
  }

  @Interval(5000)
  handleInterval() {
    this.logger.log('Running interval job every 5 seconds');
  }

  @Timeout(10000)
  handleTimeout() {
    this.logger.log('Running timeout job after 10 seconds');
  }
}
