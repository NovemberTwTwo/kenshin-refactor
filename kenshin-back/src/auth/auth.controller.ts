import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common/pipes';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { GoogleAuthCredentialsDto } from './dto/google-auth-credential.dto';
import { LocalAuthCredentialsDto } from './dto/local-auth-credential.dto';
import { GetUser } from './get-user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signUp(
    @Body(ValidationPipe) localAuthCredentialsDto: LocalAuthCredentialsDto,
  ): Promise<void> {
    return this.authService.localSignUp(localAuthCredentialsDto);
  }

  @Post('signin')
  signIn(
    @Body(ValidationPipe) localAuthCredentialsDto: LocalAuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.localSignIn(localAuthCredentialsDto);
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(): Promise<void> {
    console.log('testing');
  }

  @Get('login/oauth2/code/google')
  @UseGuards(AuthGuard('google'))
  async googleCallback(@GetUser() user): Promise<void> {
    await this.authService.googleSignUpOrIn(user as GoogleAuthCredentialsDto);
  }
}
