import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile } from 'passport';
import { Strategy } from 'passport-google-oauth20';
import { GoogleAuthCredentialsDto } from './dto/google-auth-credential.dto';

// interface GoogleStrategyType {
//   authorizationURL?: string;
//   callbackURL?: string;
//   clientID: string;
//   clientSecret: string;
//   scope?: string | string[] | undefined;
//   tokenURL?: string;
//   userProfileURL?: string;
//   passReqToCallback?: false;
// }

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID: `${process.env.OAUTH_GOOGLE_ID}`,
      clientSecret: `${process.env.OAUTH_GOOGLE_SECRET}`,
      callbackURL: `${process.env.OAUTH_GOOGLE_REDIRECT}`,
      // passReqToCallback: true,
      scope: ['email'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
  ): Promise<GoogleAuthCredentialsDto> {
    const { id, emails } = profile;
    return {
      provider: 'google',
      providerId: id,
      email: emails[0].value,
      accessToken,
      refreshToken,
    };
  }
}
