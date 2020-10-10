// Core
import {
  Injectable,
  HttpException,
  HttpStatus,
  BadRequestException,
  NotFoundException,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

// Models
import { ClientDocument } from '../db/models';

// Services
import { AuthService } from '../auth';

// Instruments
import { ClientSignup, JwtTokenType } from '../../interfaces';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('Client') private clientModel: Model<ClientDocument>,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}

  async getCurrentUserProfile(token: string) {
    const user = await this.authService.validateToken(
      token,
      JwtTokenType.ACCESS,
    );

    return user;
  }

  async createClient(userData: ClientSignup): Promise<ClientDocument> {
    // Checking if user already exists
    const emailExists = await this.clientModel
      .findOne({ email: userData.email })
      .exec();
    const phoneNumberExists = await this.clientModel
      .findOne({ phoneNumber: userData.phoneNumber })
      .exec();

    // Handling cases when user already exists
    if (emailExists)
      throw new BadRequestException('User with this email already exists');

    if (phoneNumberExists)
      throw new BadRequestException(
        'User with this phone number already exists',
      );

    // If all is ok, creating and returning a new client
    const newClient = new this.clientModel(userData);
    return newClient.save();
  }

  async getUserByPhoneNumber(phoneNumber: string): Promise<ClientDocument> {
    const user = await this.clientModel.findOne({ phoneNumber }).exec();

    return user;
  }

  async getUserByEmail(email: string): Promise<ClientDocument> {
    const user = await this.clientModel.findOne({ email }).exec();

    return user;
  }
}
