// Core
import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Query,
  Param,
  Put,
  Body,
  Headers,
  Post,
  Req,
} from '@nestjs/common';

// Dto
import { ProfileDto } from './_dto';

// Services
import { UserService, MarketService, AuthService } from '../../_services';

@Controller('profile')
export class ProfileController {
  constructor(
    private userService: UserService,
    private marketService: MarketService,
    private authService: AuthService,
  ) {}

  @Get('/current')
  async getCurrentUserData(@Headers() headers: { authorization: string }) {
    const phoneNumber = await this.authService.TEMPORARY_checkAuth(
      headers.authorization,
    );

    const userData = await this.userService.getUser(phoneNumber);

    if (!userData)
      throw new HttpException('No such user', HttpStatus.NOT_FOUND);

    return {
      success: true,
      userData: {
        ...userData,
        dailyBonus: 5, // someday this bonus will be unique
      },
    };
  }

  @Post('/favorites')
  async addFavorite(
    @Headers() headers: { authorization: string },
    @Body() body: { sku: string },
  ) {
    const { sku } = body;
    const phoneNumber = await this.authService.TEMPORARY_checkAuth(
      headers.authorization,
    );

    try {
      const userData: any = await this.userService.getUser(phoneNumber);
      const productData: any = await this.marketService.getMarketItemBySku(sku);

      if (!userData) throw new Error('No such user');
      if (!productData) throw new Error('No such product');

      await this.userService.updateUserData(userData.phoneNumber, {
        favorites: {
          ...userData.favorites,
          [sku]: productData,
        },
      });

      return { success: true };
    } catch (err) {
      throw new HttpException(
        `${err.message} at /favorites`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Post('/favorites/remove')
  async removeFavorite(
    @Headers() headers: { authorization: string },
    @Body() body: { sku: string },
  ) {
    const { sku } = body;
    const phoneNumber = await this.authService.TEMPORARY_checkAuth(
      headers.authorization,
    );

    try {
      const userData: any = await this.userService.getUser(phoneNumber);

      if (!userData) throw new Error('No such user');

      const newFavorites = { ...userData.favorites };
      delete newFavorites[sku];

      await this.userService.updateUserData(userData.phoneNumber, {
        favorites: newFavorites,
      });

      return { success: true };
    } catch (err) {
      throw new HttpException(
        `${err.message} at /favorites`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
