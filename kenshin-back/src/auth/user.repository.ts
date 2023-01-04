import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { CustomRepository } from 'src/typeorm-ex.decorator';
import { Repository } from 'typeorm';
import { LocalAuthCredentialsDto } from './dto/local-auth-credential.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcryptjs';
import { LocalUser } from './local-user.entity';
import { GoogleAuthCredentialsDto } from './dto/google-auth-credential.dto';
import { SocialUser } from './social-user.entity';

@CustomRepository(User)
export class UserRepository extends Repository<User> {
  async createLocalUser(
    localAuthCredentialsDto: LocalAuthCredentialsDto,
  ): Promise<void> {
    const { password, email } = localAuthCredentialsDto;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = this.create({ email: email });
    const localUser = new LocalUser();

    localUser.password = hashedPassword;

    user.localUser = localUser;

    try {
      await localUser.save();
      await this.save(user);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Existing email');
      } else {
        console.log(error);
        throw new InternalServerErrorException();
      }
    }
  }

  async createSocialUser(
    socialAuthCredentialsDto: GoogleAuthCredentialsDto,
  ): Promise<void> {
    const { email, providerId, provider } = socialAuthCredentialsDto;

    const user = this.create({ email: email });

    const socialUser = new SocialUser();
    socialUser.email = email;
    socialUser.provider = provider;
    socialUser.providerId = providerId;

    user.socialUser = socialUser;

    try {
      await socialUser.save();
      await this.save(user);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Existing email');
      } else {
        console.log(error);
        throw new InternalServerErrorException();
      }
    }
  }
}
