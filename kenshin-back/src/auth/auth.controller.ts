import { Body, Controller, Get, Post } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common/pipes';
import { AuthService } from './auth.service';
import { LocalAuthCredentialsDto } from './dto/local-auth-credential.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(
    @Body(ValidationPipe) localAuthCredentialsDto: LocalAuthCredentialsDto,
  ): Promise<void> {
    return this.authService.localSignUp(localAuthCredentialsDto);
  }

  @Post('/signin')
  signIn(
    @Body(ValidationPipe) localAuthCredentialsDto: LocalAuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.localSignIn(localAuthCredentialsDto);
  }

  @Get()
  test() {
    console.log(process.env.JWT_SECRET);
  }
}
