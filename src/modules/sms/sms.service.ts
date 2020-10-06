// Core
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class SmsService {
  async sendConfirmationCode(phoneNumber: string): Promise<any> {
    try {
      const code = Math.floor(Math.random() * 999999);

      return Promise.resolve({
        codeSent: true,
        number: phoneNumber,
        code,
      });
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  sendWelcomeSms(phoneNumber: string): void {
    // We don't want to wait for this or handle errors (UDP style)
    console.log('Sending welcome sms  to ', phoneNumber);
  }
}
