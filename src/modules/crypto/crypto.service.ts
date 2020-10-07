import { Injectable } from '@nestjs/common';
import * as argon2 from 'argon2';
import * as crypto from 'crypto';

@Injectable()
export class CryptoService {
  hash(password: string) {
    return argon2.hash(password);
  }

  async verify(passwordHash: string, password: string) {
    try {
      return await argon2.verify(passwordHash, password);
    } catch (error) {
      return false;
    }
  }

  randomString(length: number) {
    return crypto
      .randomBytes(Math.floor(length / 2) + (length % 2))
      .toString('hex')
      .slice(0, length);
  }

  randomStringOfNumbers(length: number) {
    return Math.random()
      .toFixed(length)
      .slice(2);
  }
}
