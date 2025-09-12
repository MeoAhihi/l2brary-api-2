import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  IsEnum,
  IsDateString,
  IsPhoneNumber,
} from 'class-validator';
import { Gender } from '../../user-profiles/entities/user-profile.entity';

export class RegisterDto {
  @ApiProperty({
    description: 'User full name',
    example: 'John Doe',
  })
  @IsString({ message: 'Full name must be a string' })
  @IsNotEmpty({ message: 'Full name is required' })
  fullName: string;

  @ApiProperty({
    description: 'User international name',
    example: 'John Doe',
  })
  @IsString({ message: 'International name must be a string' })
  @IsNotEmpty({ message: 'International name is required' })
  internationalName: string;

  @ApiProperty({
    description: 'User gender',
    example: 'male',
    enum: Gender,
  })
  @IsEnum(Gender, { message: 'Gender must be male, female, or other' })
  @IsNotEmpty({ message: 'Gender is required' })
  gender: Gender;

  @ApiProperty({
    description: 'User birthdate',
    example: '1990-05-15',
    format: 'date',
  })
  @IsDateString({}, { message: 'Please provide a valid birthdate' })
  @IsNotEmpty({ message: 'Birthdate is required' })
  birthdate: string;

  @ApiProperty({
    description: 'User phone number',
    example: '+1234567890',
  })
  @IsString({ message: 'Phone number must be a string' })
  @IsNotEmpty({ message: 'Phone number is required' })
  phoneNumber: string;

  @ApiProperty({
    description: 'User email address',
    example: 'john.doe@example.com',
    format: 'email',
  })
  @IsEmail({}, { message: 'Please provide a valid email address' })
  @IsNotEmpty({ message: 'Email is required' })
  email: string;

  @ApiProperty({
    description: 'User password',
    example: 'securePassword123',
    minLength: 6,
  })
  @IsString({ message: 'Password must be a string' })
  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string;
}
