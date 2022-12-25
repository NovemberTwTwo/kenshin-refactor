import { Module } from '@nestjs/common';
import { GenshinController } from './genshin.controller';
import { GenshinService } from './genshin.service';

@Module({
  controllers: [GenshinController],
  providers: [GenshinService],
})
export class GenshinModule {}
