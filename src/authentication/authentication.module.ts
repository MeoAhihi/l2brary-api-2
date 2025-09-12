import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserProfilesModule } from 'src/user-profiles/user-profiles.module';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
// import { GoogleStrategy } from './strategies/google.strategy';
import { InviteCodesModule } from 'src/invite-codes/invite-codes.module';
import { JWT_SECRET } from './constants/auth.constants';

@Module({
  imports: [
    InviteCodesModule,
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
