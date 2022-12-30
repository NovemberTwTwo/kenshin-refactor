import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { AuthModule } from './auth/auth.module';
import { typeORMConfig } from './configs/typeorm.config';
import { GenshinModule } from './genshin/genshin.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeORMConfig), AuthModule, GenshinModule],
})
export class AppModule {}
