// Core
import { Controller, Post, Body, Get } from '@nestjs/common';

// Dto
import { SigninDto, SignupDto } from './_dto';

@Controller('auth')
export class AuthController {
  //   constructor(private readonly appService: AppService) {}

  // For testing purposes
  @Get('/signin')
  test(): string {
    return 'Done!';
  }

  @Post('/signin')
  signin(@Body() body: SigninDto): string {
    return '/auth/signin -> Hello world!';
  }

  @Post('/signup')
  signup(@Body() body: SignupDto): string {
    return '/auth/signup -> Hello world!';
  }
}
