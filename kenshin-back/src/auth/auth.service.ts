import { Injectable } from '@nestjs/common';
import { LocalAuthCredentialsDto } from './dto/local-auth-credential.dto';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcryptjs';
import { UnauthorizedException } from '@nestjs/common/exceptions';
import { JwtService } from '@nestjs/jwt/dist';
import { GoogleAuthCredentialsDto } from './dto/google-auth-credential.dto';

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async localSignUp(
    localAuthCredentialsDto: LocalAuthCredentialsDto,
  ): Promise<void> {
    return this.userRepository.createLocalUser(localAuthCredentialsDto);
  }

  async localSignIn(
    localAuthCredentialsDto: LocalAuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const { email, password } = localAuthCredentialsDto;
    const user = await this.userRepository.findOne({
      relations: ['localUser'],
      where: { email },
    });

    if (user && (await bcrypt.compare(password, user.localUser.password))) {
      const payload = { email };
      const accessToken = this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException('login failed');
    }
  }

  async googleSignUpOrIn(
    socialAuthCredentialsDto: GoogleAuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const { email } = socialAuthCredentialsDto;
    const user = await this.userRepository.findOne({
      relations: ['socialUser'],
      where: { email },
    });

    if (user) {
      const payload = { email };
      const accessToken = this.jwtService.sign(payload);
      console.log(accessToken);
      return { accessToken };
    } else this.userRepository.createSocialUser(socialAuthCredentialsDto);
  }
}
