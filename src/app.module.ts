import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './modules/user.module';
import { UserProfilesModule } from './user-profiles/user-profiles.module';

@Module({
  imports: [DatabaseModule, UserModule, UserProfilesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
