# Migration and Seed Setup Guide

This guide explains how to use the TypeORM migration and seed system in your L2brary API project.

## 📁 Project Structure

```
src/
├── config/
│   ├── database.config.ts      # Main database configuration
│   └── typeorm.config.ts       # Migration-specific configuration
├── database/
│   ├── migrations/             # Database migration files
│   │   └── 1700000000000-CreateUserProfilesTable.ts
│   └── seeds/                  # Database seed files
│       ├── seed.config.ts      # Seed configuration
│       ├── user-profiles.seed.ts # User profiles seed data
│       └── run-seeds.ts        # Main seed runner
└── user-profiles/
    └── entities/
        └── user-profile.entity.ts
```

## 🚀 Available Scripts

### Migration Commands

```bash
# Generate a new migration based on entity changes
pnpm run migration:generate src/database/migrations/MigrationName

# Create an empty migration file
pnpm run migration:create src/database/migrations/MigrationName

# Run all pending migrations
pnpm run migration:run

# Revert the last migration
pnpm run migration:revert

# Show migration status
pnpm run migration:show
```

### Seed Commands

```bash
# Run all seeds
pnpm run seed:run

# Reset database (revert migrations, run migrations, run seeds)
pnpm run db:reset
```

## 📋 Migration Workflow

### 1. Making Changes to Entities

When you modify an entity (e.g., `user-profile.entity.ts`):

```typescript
// Example: Adding a new field to UserProfile entity
@Column({ nullable: true })
avatarUrl: string;
```

### 2. Generate Migration

```bash
pnpm run migration:generate src/database/migrations/AddAvatarUrlToUserProfile
```

This will create a new migration file with the necessary SQL changes.

### 3. Review and Run Migration

```bash
# Review the generated migration file
# Then run it
pnpm run migration:run
```

## 🌱 Seed Data

### Current Seeds

The project includes a `UserProfilesSeed` that creates sample user profiles:

- **John Doe** (john.doe@example.com)
- **Jane Smith** (jane.smith@example.com)
- **Alex Johnson** (alex.johnson@example.com)
- **Maria Garcia** (maria.garcia@example.com)
- **David Wilson** (david.wilson@example.com)

All users have the password: `password123`

### Adding New Seeds

1. Create a new seed file in `src/database/seeds/`:

```typescript
// src/database/seeds/books.seed.ts
import { DataSource } from 'typeorm';
import { Book } from '../../books/entities/book.entity';

export class BooksSeed {
  public async run(dataSource: DataSource): Promise<void> {
    const bookRepository = dataSource.getRepository(Book);
    
    // Your seed logic here
    const books = [
      { title: 'Sample Book 1', author: 'Author 1' },
      { title: 'Sample Book 2', author: 'Author 2' },
    ];

    for (const bookData of books) {
      const book = bookRepository.create(bookData);
      await bookRepository.save(book);
    }
  }
}
```

2. Add the seed to `run-seeds.ts`:

```typescript
import { BooksSeed } from './books.seed';

// In the runSeeds function
const booksSeed = new BooksSeed();
await booksSeed.run(SeedDataSource);
```

## 🔧 Configuration Details

### Database Configuration

- **Synchronize**: Disabled (always use migrations)
- **Logging**: Enabled in development
- **SSL**: Configured for Clever Cloud
- **Migrations**: Auto-discovered from `src/database/migrations/`

### Migration Configuration

- **DataSource**: Separate configuration for migrations
- **Entities**: Auto-discovered from `src/**/*.entity.ts`
- **Migrations**: Located in `src/database/migrations/`

## 🛠️ Development Workflow

### Initial Setup

1. **First time setup**:
   ```bash
   # Run migrations to create tables
   pnpm run migration:run
   
   # Seed the database with sample data
   pnpm run seed:run
   ```

2. **After pulling changes**:
   ```bash
   # Run any new migrations
   pnpm run migration:run
   ```

### Making Schema Changes

1. **Modify your entity**
2. **Generate migration**: `pnpm run migration:generate src/database/migrations/YourMigrationName`
3. **Review the migration file**
4. **Run migration**: `pnpm run migration:run`
5. **Update seeds if needed**

### Production Deployment

1. **Build the application**: `pnpm run build`
2. **Run migrations**: `pnpm run migration:run`
3. **Start the application**: `pnpm run start:prod`

## ⚠️ Important Notes

- **Never use `synchronize: true` in production**
- **Always review generated migrations before running**
- **Backup your database before running migrations in production**
- **Seeds are for development/testing only - don't run in production**

## 🔍 Troubleshooting

### Migration Issues

- **Migration already exists**: Check if the migration was already run with `pnpm run migration:show`
- **Connection issues**: Verify your database connection string in `database.config.ts`
- **Permission errors**: Ensure your database user has CREATE/ALTER permissions

### Seed Issues

- **Duplicate data**: Seeds check for existing data before inserting
- **Password hashing**: Uses bcrypt for secure password hashing
- **Connection issues**: Same as migration troubleshooting

## 📚 Additional Resources

- [TypeORM Migrations Documentation](https://typeorm.io/migrations)
- [TypeORM Seeding Documentation](https://github.com/w3tecch/typeorm-seeding)
- [MySQL Data Types](https://dev.mysql.com/doc/refman/8.0/en/data-types.html)
