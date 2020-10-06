// Core
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

// Models
// import { UserModel, Order } from '../db/models';

// Dto
import { ProfileDto } from '../../modules/profile/_dto';

@Injectable()
export class UserService {
  async createUser(data: {
    phoneNumber: string;
    email: string;
    name: string;
    isAdmin?: boolean;
    isWorker?: boolean;
  }) {
    const { isAdmin, isWorker } = data;

    try {
      // const newUser = new UserModel({
      //   ...data,
      //   isAdmin: isAdmin || false,
      //   isWorker: isWorker || false,
      //   registrationDate: Date.now(),
      //   lastVisit: Date.now(),
      // });
      // const userData = await newUser.save();
      // return userData;
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  async getUser(phoneNumber: string): Promise<any> {
    try {
      // const user: any = await UserModel.get({ phoneNumber });

      // if (!user) return null;

      // user.orders = await Promise.all(
      //   user.orders.map(async order => {
      //     const orderData = await Order.get(order);

      //     return orderData;
      //   }),
      // );

      // return user;
      return true;
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  async updateUserData(phoneNumber: string, data: object) {
    try {
      // const user: any = await UserModel.queryOne({ phoneNumber }).exec();
      // if (!user) throw new Error('User does not exist');
      // const updatedUser = new UserModel({
      //   ...user,
      //   ...data,
      //   phoneNumber,
      // });
      // const result = await updatedUser.save();
      // return result;
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  async createNewUserOrder(phoneNumber: string, orderData: object) {
    // const user: any = await UserModel.get({ phoneNumber });
    // if (!user)
    //   throw new HttpException('User does not exist', HttpStatus.NOT_FOUND);

    try {
      // const updatedUser = new UserModel({
      //   ...user,
      //   orders: [orderData, ...user.orders],
      // });
      // await updatedUser.save();
      // return updatedUser;
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }
}
