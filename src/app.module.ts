import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './contexte/auth/auth.module';
import { ShipModule } from './contexte/ship/ship.module';
import { UsersModule } from './contexte/user/users.module';
import { eventModule } from './contexte/core/events/event.modules';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: '',
        database: 'repertoire_nms',
        synchronize: true,
        logging: false,
        autoLoadEntities: true,
        charset: 'utf8mb4',
        timezone: 'Z',
        migrations: [
          join(process.cwd(), 'dist/core/database/migrations/*.js'),
          join(process.cwd(), 'src/core/database/migrations/*.ts'),
        ],
      }),
    }),

    AuthModule,
    eventModule,
    ShipModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}