import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { UserProfilesModule } from './user-profiles/user-profiles.module';

@Module({
  imports: [DatabaseModule, UserProfilesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
