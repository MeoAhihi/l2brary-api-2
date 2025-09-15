import { TypeOrmModuleOptions } from '@nestjs/typeorm';

// Parse the MySQL connection string
const parseConnectionString = (connectionString: string) => {
  const url = new URL(connectionString);
  return {
    host: url.hostname,
    port: parseInt(url.port) || 3306,
    username: url.username,
    password: url.password,
    database: url.pathname.substring(1), // Remove leading slash
  };
};

// Your MySQL connection string
const CONNECTION_STRING = process.env.MYSQL_DATABASE_URL ?? '';

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
