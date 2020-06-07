// Core
import { Controller, Get, Post, Body, Res, Param } from '@nestjs/common';

// Instrumnets
import * as fs from 'fs';
import { join } from 'path';

@Controller('app')
export class AppController {
  @Get('/g-maps')
  getGoogleMapsApiKey() {
    return { success: true, data: process.env.GOOGLE_MAPS_API_KEY };
  }

  @Post('/logs')
  sendLogs(@Body() body, @Param('name') name) {
    let filepath = '';
    if (name) {
      filepath = join('logs', `${name}.txt`);
      fs.appendFileSync(filepath, body.logs);
    } else {
      filepath = join('logs', `latest.txt`);
      fs.writeFileSync(filepath, body.logs);
    }

    return { success: true, filepath };
  }

  @Get('/logs')
  getLogs(@Res() res, @Param('name') name) {
    const filepath = join('logs', `${name || 'latest'}.txt`);
    const data = fs.readFileSync(filepath);

    res.send(data);
  }
}
