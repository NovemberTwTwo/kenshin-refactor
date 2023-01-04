import { IsString } from 'class-validator';

export class GoogleAuthCredentialsDto {
  @IsString()
  email: string;

  @IsString()
  providerId: string;

  @IsString()
  provider: string;

  @IsString()
  accessToken: string;

  @IsString()
  refreshToken: string;
}
