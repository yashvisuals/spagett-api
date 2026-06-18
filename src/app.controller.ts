import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // Lightweight endpoint for uptime pingers to keep the free instance awake.
  @Get('health')
  health() {
    return { status: 'ok' };
  }
}
