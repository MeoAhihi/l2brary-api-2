import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { parseConnectionString } from 'src/common/util';
// Parse the MySQL connection string
ConfigModule.forRoot({
  isGlobal: true,
  envFilePath: '.env',
});
const configService = new ConfigService();
// Your MySQL connection string
const CONNECTION_STRING = configService.get<string>('MYSQL_DATABASE_URL') ?? '';

const dbConfig = parseConnectionString(CONNECTION_STRING);

export const getDatabaseConfig = (): TypeOrmModuleOptions => ({
  type: 'mysql',
  host: dbConfig.host,
  port: dbConfig.port,
  username: dbConfig.username,
  password: dbConfig.password,
  database: dbConfig.database,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/../database/migrations/*{.ts,.js}'],
  synchronize: false, // Always false when using migrations
  logging: process.env.NODE_ENV === 'development',
  ssl: {
    rejectUnauthorized: false, // For cloud databases like Clever Cloud
  },
});
