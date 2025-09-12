import { BadRequestException, Injectable } from '@nestjs/common';
import { UpdateInviteCodeDto } from './dto/update-invite-code.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InviteCode } from './entities/invite-code.entity';

@Injectable()
export class InviteCodesService {
  constructor(
    @InjectRepository(InviteCode)
    private inviteCodeRepository: Repository<InviteCode>,
  ) {}

  async create(): Promise<InviteCode> {
    const inviteCode = this.inviteCodeRepository.create({
      code: crypto.randomUUID(),
      used: false,
      usedBy: undefined,
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours from now
    });
    return this.inviteCodeRepository.save(inviteCode);
  }

  async findAll(): Promise<InviteCode[]> {
    return this.inviteCodeRepository.find();
  }

  async findOne(id: string): Promise<InviteCode> {
    const inviteCode = await this.inviteCodeRepository.findOne({
      where: { id },
    });
    if (!inviteCode) {
      throw new Error('Invite code not found');
    }
    return inviteCode;
  }

  async markInviteCodeAsUsed(inviteId: string, userId: string): Promise<void> {
    const inviteCode = await this.findOne(inviteId);

    if (inviteCode.used) {
      throw new Error('Invite code has already been used');
    }

    inviteCode.used = true;
    inviteCode.usedBy = userId;

    await this.inviteCodeRepository.save(inviteCode);
  }

  async validateInviteCode(id: string): Promise<InviteCode> {
    const invite = await this.findOne(id);

    if (invite.expiresAt && invite.expiresAt < new Date()) {
      throw new BadRequestException('Invite code has expired');
    }

    return invite;
  }

  update(id: number, updateInviteCodeDto: UpdateInviteCodeDto) {
    return `This action updates a #${id} inviteCode`;
  }

  remove(id: number) {
    return `This action removes a #${id} inviteCode`;
  }
}
