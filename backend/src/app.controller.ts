import { Controller, Get, Logger, Request } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  private readonly logger = new Logger(AppController.name);

  @Get()
  getHello(@Request() req): string {
    this.logger.debug('returning hello');
    return this.appService.getHello();
  }
}
