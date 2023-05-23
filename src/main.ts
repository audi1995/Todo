import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { JwtAuthGuard } from './auth/guard/jwt.guard';
import { JwtService } from '@nestjs/jwt';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const jwtService = app.get<JwtService>(JwtService);
  app.useGlobalGuards(new JwtAuthGuard(jwtService)); 
  await app.listen(3000);
}
bootstrap();
