import { Injectable } from '@nestjs/common';
import { Cron, CronExpression, Interval, Timeout } from '@nestjs/schedule';

@Injectable()
export class TaskService {
  @Cron(CronExpression.EVERY_30_SECONDS)
  handleCron() {
    console.log('Running cron job every 30 seconds');
  }

  @Interval(5000)
  handleInterval() {
    console.log('Running interval job every 5 seconds');
  }

  @Timeout(10000)
  handleTimeout() {
    console.log('Running timeout job after 10 seconds');
  }
}
