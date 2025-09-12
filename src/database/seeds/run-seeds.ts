import { SeedDataSource } from './seed.config';
import { UserProfilesSeed } from './user-profiles.seed';

async function runSeeds() {
  try {
    console.log('Initializing database connection...');
    await SeedDataSource.initialize();
    console.log('Database connection established');

    // Run seeds
    console.log('Running user profiles seed...');
    const userProfilesSeed = new UserProfilesSeed();
    await userProfilesSeed.run(SeedDataSource);

    console.log('All seeds completed successfully!');
  } catch (error) {
    console.error('Error running seeds:', error);
    process.exit(1);
  } finally {
    if (SeedDataSource.isInitialized) {
      await SeedDataSource.destroy();
      console.log('Database connection closed');
    }
  }
}

runSeeds();
