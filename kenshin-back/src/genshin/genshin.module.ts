import { Module } from '@nestjs/common';
import { GenshinController } from './genshin.controller';

@Module({
  controllers: [GenshinController],
})
export class GenshinModule {}
