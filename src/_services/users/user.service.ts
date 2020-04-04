// Core
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

// Models
import { UserModel } from '../db/models';

@Injectable()
export class UserService {
  async createUser(data: {
    phoneNumber: string;
    email: string;
    firstName: string;
    lastName: string;
    isAdmin: boolean;
    isWorker: boolean;
  }) {
    try {
      const newUser = new UserModel({
        ...data,
        registrationDate: Date.now(),
        lastVisit: Date.now(),
      });

      await newUser.save();
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }
}
