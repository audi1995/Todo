import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ConfigService } from '@nestjs/config/dist';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { TodoModule } from './todo/todo.module';
import { User } from './user/entities/user.entity';
import { Todo } from './todo/entities/todo.entity';
import { AuthModule } from './auth/auth.module';

@Module({
 imports: [
  ConfigModule.forRoot({
isGlobal: true,
envFilePath: ['.env']
  }),
  TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    inject:  [ConfigService],
   useFactory: (configService: ConfigService) =>({  
    type: 'postgres',
    host: configService.get('DB_HOST'),
    port: configService.get<number>('DB_PORT'),
    username: configService.get('DB_USERNAME'),
    password: configService.get('DB_PASSWORD'),
    database: configService.get('DB_DATABASE'),
    entities: [User,Todo],
    synchronize: true,
    logging: configService.get<boolean>('DB_LOGGING')
  })
  }),
  UserModule,
  TodoModule,
  AuthModule
 ],
 controllers: [],
 providers: [],
})
export class AppModule {}
