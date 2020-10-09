// Core
import {
  Injectable,
  HttpException,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

// Models
import { ClientDocument } from '../db/models';

// Instruments
import { ClientSignup } from '../../interfaces';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('Client') private clientModel: Model<ClientDocument>,
  ) {}

  async createClient(userData: ClientSignup): Promise<ClientDocument> {
    // Checking if user already exists
    const emailExists = await this.clientModel
      .find({ email: userData.email })
      .exec();
    const phoneNumberExists = await this.clientModel
      .find({ phoneNumber: userData.phoneNumber })
      .exec();

    // Handling cases when user already exists
    if (emailExists.length)
      throw new BadRequestException('User with this email already exists');

    if (phoneNumberExists.length)
      throw new BadRequestException(
        'User with this phone number already exists',
      );

    // If all is ok, creating and returning a new client
    const newClient = new this.clientModel(userData);
    return newClient.save();
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
