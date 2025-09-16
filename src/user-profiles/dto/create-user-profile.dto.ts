import {
  IsEmail,
  IsEnum,
  IsDateString,
  IsString,
  IsNotEmpty,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Gender } from '../entities/user-profile.entity';

export class CreateUserProfileDto {
  @ApiProperty({
    description: 'Full name of the user',
    example: 'John Doe',
  })
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @ApiProperty({
    description: 'International name of the user',
    example: 'John Doe',
  })
  @IsString()
  @IsNotEmpty()
  internationalName: string;

  @ApiProperty({
    description: 'Gender of the user',
    enum: Gender,
    example: Gender.MALE,
  })
  @IsEnum(Gender)
  gender: Gender;

  @ApiProperty({
    description: 'Birthdate of the user',
    example: '1990-01-01',
  })
  @IsDateString()
  birthdate: string;

  @ApiProperty({
    description: 'Phone number of the user',
    example: '+1234567890',
  })
  @IsString()
  @IsNotEmpty()
  phoneNumber: string;

  @ApiProperty({
    description: 'Email address of the user',
    example: 'john.doe@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Password for the user account',
    example: 'securePassword123',
    minLength: 8,
  })
  @IsString()
  @MinLength(8)
  password: string;
}
