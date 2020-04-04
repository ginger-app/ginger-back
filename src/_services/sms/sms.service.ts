// Core
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class SmsService {
  sendConfirmationCode(phoneNumber: string): Promise<any> {
    try {
      return Promise.resolve({ sent: true, number: phoneNumber });
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }
}
