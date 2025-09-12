import { Module } from '@nestjs/common';
import { InviteCodesService } from './invite-codes.service';
import { InviteCodesController } from './invite-codes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InviteCode } from './entities/invite-code.entity';

@Module({
  imports: [TypeOrmModule.forFeature([InviteCode])],
  controllers: [InviteCodesController],
  providers: [InviteCodesService],
  exports: [InviteCodesService],
})
export class InviteCodesModule {}
