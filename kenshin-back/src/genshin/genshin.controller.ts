import { Controller } from '@nestjs/common';
import { GenshinService } from './genshin.service';

@Controller('genshin')
export class GenshinController {
  constructor(private genshinService: GenshinService) {
    this.genshinService = genshinService;
  }
}
