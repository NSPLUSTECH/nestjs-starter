import Services from 'src/Services';
import entities from 'src/Entities';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Test } from '@nestjs/testing';
import Controllers from 'src/Controllers';

const getTestingAppModule = async () => await Test.createTestingModule({
    controllers: Controllers,
    providers: Services,
    imports: [ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
        type: 'postgres',
        host: process.env.DATABASE_HOST,
        port: parseInt(process.env.DATABASE_PORT),
        username: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        database: 'test',
        entities: entities,
        autoLoadEntities: true,
        synchronize: true,
        dropSchema: true,
    }),
    TypeOrmModule.forFeature(entities),
    JwtModule.register({
        global: true,
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: '60s' },
    })]
}).compile();
export default getTestingAppModule