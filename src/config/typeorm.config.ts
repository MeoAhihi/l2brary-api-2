import { ConfigModule, ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';
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

// Create a DataSource for migrations
export const AppDataSource = new DataSource({
  type: 'mysql',
  host: dbConfig.host,
  port: dbConfig.port,
  username: dbConfig.username,
  password: dbConfig.password,
  database: dbConfig.database,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/../database/migrations/*{.ts,.js}'],
  synchronize: false, // Always false for migrations
  logging: true,
  ssl: {
    rejectUnauthorized: false,
  },
});
