import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common/pipes';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { GenshinService } from './genshin.service';

@Controller('genshin')
@UseGuards(AuthGuard())
export class GenshinController {
  constructor(private genshinService: GenshinService) {
    this.genshinService = genshinService;
  }

  @Get()
  @UsePipes(ValidationPipe)
  getMyData(@GetUser() user: User) {
    return this.genshinService.getMyData(user);
  }

  @Get('/test')
  @UsePipes(ValidationPipe)
  getMyProfile(@GetUser() user: User) {
    return this.genshinService.getMyProfile(user);
  }

  @Get('/note')
  @UsePipes(ValidationPipe)
  getMyNote(@GetUser() user: User) {
    return this.genshinService.getMyNote(user);
  }

  @Get('/user?')
  @UsePipes(ValidationPipe)
  getUserProfile(@GetUser() user: User, @Query('uid') uid: string) {
    return this.genshinService.getUserProfile(uid);
  }

  @Get('/characters?')
  @UsePipes(ValidationPipe)
  getUserCharacter(@GetUser() user: User, @Query('uid') uid: string) {
    return this.genshinService.getUserCharacters(uid);
  }

  @Post('/mihoyo-cookie')
  @UsePipes(ValidationPipe)
  setCookie(@GetUser() user: User, @Body() body: any): Promise<void> {
    return this.genshinService.setCookie(user, body.mihoyoCookie);
  }
}
