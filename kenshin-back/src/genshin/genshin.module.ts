import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserRepository } from 'src/auth/user.repository';
import { TypeOrmExModule } from 'src/typeorm-ex.module';
import { GenshinController } from './genshin.controller';
import { GenshinService } from './genshin.service';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'Secret1234',
      signOptions: {
        expiresIn: 60 * 60 * 24 * 3,
      },
    }),
    TypeOrmExModule.forCustomRepository([UserRepository]),
  ],
  controllers: [GenshinController],
  providers: [GenshinService],
})
export class GenshinModule {}
