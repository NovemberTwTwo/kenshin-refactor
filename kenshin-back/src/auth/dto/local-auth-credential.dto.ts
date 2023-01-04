import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class LocalAuthCredentialsDto {
  @IsString()
  @MinLength(10)
  @Matches(
    /^[a-zA-Z0-9\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    { message: 'Not matches email form' },
  )
  email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(40)
  @Matches(/^[a-zA-Z0-9\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]*$/, {
    message: 'password only accepts english and number, specials',
  })
  password: string;
}
