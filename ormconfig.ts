const { DataSource } = require("typeorm");
require('dotenv').config();

const AppDataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    entities: [__dirname + '/src/Entities/*.entity.ts'],
    migrations: ['./migrations/*.ts'],
    synchronize: true,
})

module.exports = AppDataSource;