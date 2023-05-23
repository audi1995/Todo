import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategy/local.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtAuthGuard } from './guard/jwt.guard';

@Module({

  imports: [PassportModule, UserModule, JwtModule.registerAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => ({
      global: true,
      secret: configService.get('DB_secret'),
      signOptions: { expiresIn: '1d' },
    })
  }),],
  controllers: [AuthController],
  providers: [LocalStrategy, JwtAuthGuard] 
})

export class AuthModule { }
