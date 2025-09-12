import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserProfilesService } from 'src/user-profiles/user-profiles.service';
import { Repository } from 'typeorm';
import { InviteCode } from '../invite-codes/entities/invite-code.entity';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { UserProfile } from 'src/user-profiles/entities/user-profile.entity';
import { compareSync, hashSync } from 'bcrypt';
import { AuthResponseDto, TokenResponseDto } from './dto/auth-response.dto';
import {
  JWT_SECRET,
  JWT_REFRESH_SECRET,
  JWT_EXPIRES_IN,
  JWT_REFRESH_EXPIRES_IN,
} from './constants/auth.constants';
import { InjectRepository } from '@nestjs/typeorm';
import { InviteCodesService } from 'src/invite-codes/invite-codes.service';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly inviteCodesService: InviteCodesService,
    private readonly userProfileService: UserProfilesService,
    private readonly jwtService: JwtService,
  ) {}
  // async login(loginDto: LoginDto): Promise<AuthResponseDto> {
  //   const { email, password } = loginDto;

  //   // Find user by email
  //   const user = await this.userProfileService.findByEmail(email);
  //   if (!user) {
  //     throw new UnauthorizedException('Invalid credentials');
  //   }

  //   // Verify password
  //   const isPasswordValid = this.validatePassword(user, password);
  //   if (!isPasswordValid) {
  //     throw new UnauthorizedException('Invalid credentials');
  //   }

  //   // Generate tokens
  //   const tokens = this.generateTokens(user);

  //   return {
  //     ...tokens,
  //     user,
  //   };
  // }

  async register(
    inviteCode: string,
    registerDto: RegisterDto,
  ): Promise<AuthResponseDto> {
    // Validate invite code
    const invite = await this.inviteCodesService.validateInviteCode(inviteCode);

    // Check if user already exists
    const existingUser = await this.userProfileService.findByEmail(
      registerDto.email,
    );
    if (existingUser) {
      throw new BadRequestException('User with this email already exists');
    }

    // Hash password
    const hashedPassword = hashSync(registerDto.password, 10);

    // Create user
    const user = await this.userProfileService.create({
      ...registerDto,
      password: hashedPassword,
    });

    // Mark invite code as used
    await this.inviteCodesService.markInviteCodeAsUsed(invite.id, user.id);

    // Generate tokens
    const tokens = this.generateTokens(user);

    return {
      ...tokens,
      user,
    };
  }

  // async googleLogin(googleUser: any): Promise<AuthResponseDto> {
  //   // Check if user exists by email
  //   let user = await this.userProfileService.findByEmail(googleUser.email);

  //   if (!user) {
  //     // Create new user for Google login
  //     user = await this.userProfileService.create({
  //       fullName: googleUser.fullName,
  //       internationalName: googleUser.internationalName,
  //       email: googleUser.email,
  //       password: hashSync(Math.random().toString(36), 10), // Random password for Google users
  //       gender: 'other' as any, // Default gender
  //       birthdate: '1990-01-01', // Default birthdate
  //       phoneNumber: '', // Empty phone number
  //     });
  //   }

  //   // Generate tokens
  //   const tokens = this.generateTokens(user);

  //   return {
  //     ...tokens,
  //     user,
  //   };
  // }

  async validateUser(
    email: string,
    password: string,
  ): Promise<UserProfile | null> {
    const user = await this.userProfileService.findByEmail(email);
    if (user && this.validatePassword(user, password)) {
      return user;
    }
    return null;
  }

  async validateUserById(id: string): Promise<UserProfile | null> {
    return await this.userProfileService.findOne(id);
  }

  async refreshTokens(refreshToken: string): Promise<TokenResponseDto> {
    try {
      const payload = this.jwtService.verify(refreshToken, {
        secret: JWT_REFRESH_SECRET,
      });
      const user = await this.userProfileService.findOne(payload.sub);

      if (!user) {
        throw new UnauthorizedException('Invalid refresh token');
      }

      return this.generateTokens(user);
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  private validatePassword(user: UserProfile, password: string): boolean {
    return compareSync(password, user.password);
    // return password === user.password;
  }

  generateTokens(user: UserProfile): TokenResponseDto {
    const payload = {
      email: user.email,
      sub: user.id,
      fullName: user.fullName,
    };

    const accessToken = this.jwtService.sign(payload, {
      secret: JWT_SECRET,
      expiresIn: JWT_EXPIRES_IN,
    });

    const refreshToken = this.jwtService.sign(payload, {
      secret: JWT_REFRESH_SECRET,
      expiresIn: JWT_REFRESH_EXPIRES_IN,
    });

    return {
      accessToken,
      refreshToken,
    };
  }
}
