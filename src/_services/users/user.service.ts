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
    isAdmin?: boolean;
    isWorker?: boolean;
  }) {
    const { isAdmin, isWorker } = data;

    try {
      const newUser = new UserModel({
        ...data,
        isAdmin: isAdmin || false,
        isWorker: isWorker || false,
        registrationDate: Date.now(),
        lastVisit: Date.now(),
      });

      const userData = await newUser.save();
      return userData;
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  async getUser(phoneNumber: string): Promise<Object> {
    return UserModel.get({ phoneNumber })
      .then(user => user)
      .catch(err => {
        throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
      });
  }
}
