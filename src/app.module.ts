import { Module } from '@nestjs/common';
import { AppController } from './Controllers/app.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import entities from './Entities';
import services from './Services';
import controllers from './Controllers';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: entities,
      autoLoadEntities: true,
    }),
    TypeOrmModule.forFeature(entities)
  ],
  controllers: controllers,
  providers: services,
})
export class AppModule { }
