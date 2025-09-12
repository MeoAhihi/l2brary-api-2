# Database Setup - TypeORM with MySQL

This project is configured to use TypeORM with MySQL database hosted on Clever Cloud.

## Configuration

The database configuration is located in `src/config/database.config.ts` and includes:

- **Database Type**: MySQL
- **Host**: bqsa2q0r2m5ugjksw7jd-mysql.services.clever-cloud.com
- **Port**: 3306
- **Database**: bqsa2q0r2m5ugjksw7jd
- **SSL**: Enabled with `rejectUnauthorized: false` for cloud databases

## Features

- ✅ **TypeORM Integration**: Full TypeORM setup with NestJS
- ✅ **Entity Management**: Automatic entity discovery and registration
- ✅ **Database Synchronization**: Enabled in development mode
- ✅ **Logging**: SQL queries logged in development mode
- ✅ **SSL Support**: Configured for cloud database connections

## Project Structure

```
src/
├── config/
│   └── database.config.ts      # Database configuration
├── database/
│   └── database.module.ts      # Database module
├── entities/
│   └── user.entity.ts          # Sample User entity
├── services/
│   └── user.service.ts         # User service with CRUD operations
├── controllers/
│   └── user.controller.ts      # User controller with REST endpoints
├── modules/
│   └── user.module.ts          # User module
└── app.module.ts               # Main app module
```

## Sample Entity

The project includes a sample `User` entity with:
- Auto-generated ID
- Email (unique)
- Name
- Created/Updated timestamps

## API Endpoints

With the sample User entity, you get these REST endpoints:

- `GET /users` - Get all users
- `GET /users/:id` - Get user by ID
- `POST /users` - Create new user
- `PUT /users/:id` - Update user
- `DELETE /users/:id` - Delete user

## Usage

1. **Start the application**:
   ```bash
   pnpm run start:dev
   ```

2. **Access Swagger documentation**:
   - Visit: `http://localhost:3000/api`
   - Test the User endpoints

3. **Database operations**:
   - TypeORM will automatically create tables based on your entities
   - Synchronization is enabled in development mode
   - Check the console for SQL query logs

## Environment Variables

The database connection is currently hardcoded in the configuration file. For production, consider using environment variables:

```env
DB_HOST=your-host
DB_PORT=3306
DB_USERNAME=your-username
DB_PASSWORD=your-password
DB_DATABASE=your-database
NODE_ENV=production
```

## Next Steps

1. Create additional entities as needed
2. Set up proper environment variable configuration
3. Add database migrations for production
4. Implement proper error handling and validation
