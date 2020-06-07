// Core
import { Controller, Get, Post, Body, Res, Param } from '@nestjs/common';

// Services
import { RedisStorageService } from '../../_services';

@Controller('app')
export class AppController {
  constructor(private readonly redisService: RedisStorageService) {}

  @Get('/g-maps')
  getGoogleMapsApiKey() {
    return { success: true, data: process.env.GOOGLE_MAPS_API_KEY };
  }

  @Post('/logs')
  async sendLogs(@Body() body, @Param('name') name, @Res() res) {
    try {
      if (name) {
        const existingLogs = await this.redisService.get(`logs_${name}`);

        await this.redisService.set(
          `log_name`,
          `${existingLogs || ''}\n${body.logs}`,
        );
        return res.send({ success: true });
      } else {
        await this.redisService.set(`logs_latest`, body.logs);
        return res.send({ success: true });
      }
    } catch (err) {
      throw err;
    }
  }

  @Get('/logs')
  async getLogs(@Res() res, @Param('name') name) {
    const data = await this.redisService.get(
      name ? `logs_${name}` : 'logs_latest',
    );

    res.send(data);
  }
}
