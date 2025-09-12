import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Request } from 'express';
import { AuthenticationService } from './authentication.service';
import { AuthResponseDto, TokenResponseDto } from './dto/auth-response.dto';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { GoogleAuthGuard } from './guards/google-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { UserProfile } from 'src/user-profiles/entities/user-profile.entity';

@ApiTags('Authentication')
@Controller('auth')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('login')
  @ApiOperation({ summary: 'User login' })
  @ApiResponse({
    status: 200,
    description: 'Login successful',
    type: AuthResponseDto,
  })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  @UseGuards(LocalAuthGuard)
  async login(@Body() loginDto: LoginDto, @Req() request: Request) {
    const user = request.user;
    return this.authenticationService.generateTokens(user as UserProfile);
  }

  @Post('register')
  @ApiOperation({ summary: 'User registration with invite code' })
  @ApiResponse({
    status: 201,
    description: 'Registration successful',
    type: AuthResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid invite code or user already exists',
  })
  async register(
    @Query('inviteCode') inviteCode: string,
    @Body() registerDto: RegisterDto,
  ): Promise<AuthResponseDto> {
    return this.authenticationService.register(inviteCode, registerDto);
  }

  @Get('google')
  @ApiOperation({ summary: 'Google OAuth login' })
  @UseGuards(GoogleAuthGuard)
  async googleAuth(@Req() req: Request) {
    // This will redirect to Google OAuth
  }

  // @Get('google/callback')
  // @ApiOperation({ summary: 'Google OAuth callback' })
  // @UseGuards(GoogleAuthGuard)
  // async googleAuthCallback(@Req() req: any, @Res() res: Response) {
  //   const result = await this.authenticationService.googleLogin(req.user);

  //   // Redirect to frontend with tokens
  //   const redirectUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/auth/callback?accessToken=${result.accessToken}&refreshToken=${result.refreshToken}`;
  //   res.redirect(redirectUrl);
  // }

  @Post('refresh')
  @ApiOperation({ summary: 'Refresh access token' })
  @ApiResponse({
    status: 200,
    description: 'Token refreshed successfully',
    type: TokenResponseDto,
  })
  @ApiResponse({ status: 401, description: 'Invalid refresh token' })
  async refresh(
    @Body('refreshToken') refreshToken: string,
  ): Promise<TokenResponseDto> {
    return this.authenticationService.refreshTokens(refreshToken);
  }

  @Get('profile')
  @ApiOperation({ summary: 'Get current user profile' })
  @ApiResponse({
    status: 200,
    description: 'User profile retrieved successfully',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async getProfile(@Req() req: any) {
    return req.user;
  }
}
