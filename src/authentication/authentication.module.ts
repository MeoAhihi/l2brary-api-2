import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';
import { UserProfilesModule } from 'src/user-profiles/user-profiles.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InviteCode } from './entities/invite-code';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
// import { GoogleStrategy } from './strategies/google.strategy';
import { JWT_SECRET, JWT_REFRESH_SECRET } from './constants/auth.constants';

@Module({
  imports: [
    TypeOrmModule.forFeature([InviteCode]),
    UserProfilesModule,
    PassportModule,
    JwtModule.register({
      secret: JWT_SECRET,
      signOptions: { expiresIn: '15m' },
    }),
  ],
  controllers: [AuthenticationController],
  providers: [
    AuthenticationService,
    JwtStrategy,
    LocalStrategy,
    // GoogleStrategy,
  ],
  exports: [AuthenticationService],
})
export class AuthenticationModule {}
