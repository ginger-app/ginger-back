// Core
import { Controller, Get } from '@nestjs/common';

@Controller('app')
export class AppController {
  @Get('/g-maps')
  getGoogleMapsApiKey() {
    return { success: true, data: process.env.GOOGLE_MAPS_API_KEY };
  }
}
