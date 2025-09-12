import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { InviteCodesService } from './invite-codes.service';
import { CreateInviteCodeDto } from './dto/create-invite-code.dto';
import { UpdateInviteCodeDto } from './dto/update-invite-code.dto';

@Controller('invite-codes')
export class InviteCodesController {
  constructor(private readonly inviteCodesService: InviteCodesService) {}

  @Post()
  create(@Body() createInviteCodeDto: CreateInviteCodeDto) {
    return this.inviteCodesService.create();
  }

  @Get()
  findAll() {
    return this.inviteCodesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.inviteCodesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateInviteCodeDto: UpdateInviteCodeDto,
  ) {
    return this.inviteCodesService.update(+id, updateInviteCodeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.inviteCodesService.remove(+id);
  }
}
