import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { GenshinModule } from './genshin/genshin.module';

@Module({
  imports: [AuthModule, GenshinModule],
})
export class AppModule {}
