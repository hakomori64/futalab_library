import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { Invitation } from 'src/invitations/entities/invitation.entity';


@Injectable()
export class InvitationsService {
  private readonly logger = new Logger(InvitationsService.name);
  constructor(
    @InjectRepository(Invitation)
    private invitationRepository: Repository<Invitation>,
  ) {}

  findAll(group_id: number) {
    return this.invitationRepository.find({ where: { group_id }, relations: ["user", "group"]});
  }
}
