import { DataSource } from 'typeorm';
import { UserProfile, Gender } from '../../user-profiles/entities/user-profile.entity';
import * as bcrypt from 'bcrypt';

export class UserProfilesSeed {
  public async run(dataSource: DataSource): Promise<void> {
    const userProfileRepository = dataSource.getRepository(UserProfile);

    // Check if users already exist
    const existingUsers = await userProfileRepository.count();
    if (existingUsers > 0) {
      console.log('User profiles already exist, skipping seed...');
      return;
    }

    // Sample user profiles data
    const userProfiles = [
      {
        fullName: 'John Doe',
        internationalName: 'John Doe',
        gender: Gender.MALE,
        birthdate: new Date('1990-05-15'),
        phoneNumber: '+1234567890',
        email: 'john.doe@example.com',
        password: await bcrypt.hash('password123', 10),
      },
      {
        fullName: 'Jane Smith',
        internationalName: 'Jane Smith',
        gender: Gender.FEMALE,
        birthdate: new Date('1992-08-22'),
        phoneNumber: '+1234567891',
        email: 'jane.smith@example.com',
        password: await bcrypt.hash('password123', 10),
      },
      {
        fullName: 'Alex Johnson',
        internationalName: 'Alex Johnson',
        gender: Gender.OTHER,
        birthdate: new Date('1988-12-10'),
        phoneNumber: '+1234567892',
        email: 'alex.johnson@example.com',
        password: await bcrypt.hash('password123', 10),
      },
      {
        fullName: 'Maria Garcia',
        internationalName: 'Maria Garcia',
        gender: Gender.FEMALE,
        birthdate: new Date('1995-03-18'),
        phoneNumber: '+1234567893',
        email: 'maria.garcia@example.com',
        password: await bcrypt.hash('password123', 10),
      },
      {
        fullName: 'David Wilson',
        internationalName: 'David Wilson',
        gender: Gender.MALE,
        birthdate: new Date('1987-11-25'),
        phoneNumber: '+1234567894',
        email: 'david.wilson@example.com',
        password: await bcrypt.hash('password123', 10),
      },
    ];

    // Insert user profiles
    for (const userData of userProfiles) {
      const userProfile = userProfileRepository.create(userData);
      await userProfileRepository.save(userProfile);
      console.log(`Created user profile: ${userProfile.fullName} (${userProfile.email})`);
    }

    console.log(`Successfully seeded ${userProfiles.length} user profiles`);
  }
}
