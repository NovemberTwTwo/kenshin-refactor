import { Controller, Get, Query } from '@nestjs/common';
import { GenshinService } from './genshin.service';

@Controller('genshin')
export class GenshinController {
  constructor(private genshinService: GenshinService) {
    this.genshinService = genshinService;
  }

  @Get()
  getMyData() {
    return this.genshinService.getMyData();
  }

  @Get('/test')
  getMyProfile() {
    return this.genshinService.getMyProfile();
  }

  @Get('/note')
  getMyNote() {
    return this.genshinService.getMyNote();
  }

  @Get('/user?')
  getUserProfile(@Query('uid') uid: string) {
    return this.genshinService.getUserProfile(uid);
  }

  @Get('/characters?')
  getUserCharacter(@Query('uid') uid: string) {
    return this.genshinService.getUserCharacters(uid);
  }
}
