import { IsString } from 'class-validator';

export class GoogleAuthCredentialsDto {
  @IsString()
  name: string;

  @IsString()
  email: string;

  @IsString()
  providerId: string;

  @IsString()
  provider: string;
}
