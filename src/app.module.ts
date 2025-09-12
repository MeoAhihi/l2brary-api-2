import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { UserProfilesModule } from './user-profiles/user-profiles.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { InviteCodesModule } from './invite-codes/invite-codes.module';

@Module({
  imports: [DatabaseModule, UserProfilesModule, AuthenticationModule, InviteCodesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
