import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserProfileDto } from './dto/create-user-profile.dto';
import { UpdateUserProfileDto } from './dto/update-user-profile.dto';
import { Repository, IsNull } from 'typeorm';
import { UserProfile } from './entities/user-profile.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserProfilesService {
  constructor(
    @InjectRepository(UserProfile)
    private readonly userProfileRepository: Repository<UserProfile>,
  ) {}

  async create(
    createUserProfileDto: CreateUserProfileDto,
  ): Promise<UserProfile> {
    const userProfile = this.userProfileRepository.create(createUserProfileDto);
    return await this.userProfileRepository.save(userProfile);
  }

  async findAll(): Promise<UserProfile[]> {
    return await this.userProfileRepository.find({
      where: { deletedAt: IsNull() },
    });
  }

  async findOne(id: string): Promise<UserProfile> {
    const userProfile = await this.userProfileRepository.findOne({
      where: { id, deletedAt: IsNull() },
    });

    if (!userProfile) {
      throw new NotFoundException(`UserProfile with ID ${id} not found`);
    }

    return userProfile;
  }

  async findByEmail(email: string): Promise<UserProfile | null> {
    return await this.userProfileRepository.findOne({
      where: { email, deletedAt: IsNull() },
    });
  }

  async update(
    id: string,
    updateUserProfileDto: UpdateUserProfileDto,
  ): Promise<UserProfile> {
    const userProfile = await this.findOne(id);

    Object.assign(userProfile, updateUserProfileDto);
    userProfile.updatedAt = new Date();

    return await this.userProfileRepository.save(userProfile);
  }

  async remove(id: string): Promise<void> {
    const userProfile = await this.findOne(id);

    userProfile.deletedAt = new Date();
    await this.userProfileRepository.save(userProfile);
  }
}
