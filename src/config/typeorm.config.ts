import { DataSource } from 'typeorm';

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
const CONNECTION_STRING = 'mysql://udqvr5nuwjv5kldh:ZXevL3j177QmZdwOBLry@bqsa2q0r2m5ugjksw7jd-mysql.services.clever-cloud.com:3306/bqsa2q0r2m5ugjksw7jd';

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
