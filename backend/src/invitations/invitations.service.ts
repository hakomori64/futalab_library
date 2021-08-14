import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ManagementClient, AuthenticationClient } from "auth0";
import { GroupsService } from '../groups/groups.service';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { Repository } from 'typeorm';
import { CreateInvitationDto } from './dto/create-invitation.dto';
import { UpdateInvitationDto } from './dto/update-invitation.dto';
import { Invitation } from './entities/invitation.entity';

const Moniker = require("moniker");
const generator = require("generate-password");


@Injectable()
export class InvitationsService {
  constructor(
    private usersService: UsersService,
    private groupsService: GroupsService,
    @InjectRepository(Invitation)
    private invitationRepository: Repository<Invitation>,
  ) {}

  async create(createInvitationDto: CreateInvitationDto) {
    const { email, group_id } = createInvitationDto;

    let user: User = await this.usersService.findOneBy({ email: email });

    if (user === null || user === undefined) {
      // create auth0 user and send signup email
      const authData = {
        domain: process.env.AUTH0_DOMAIN,
        clientId: process.env.AUTH0_CLIENT_ID,
        clientSecret: process.env.AUTH0_CLIENT_SECRET,
        scope: 'create:users'
      };

      const authenticationClient = new AuthenticationClient(authData);
      const managementClient = new ManagementClient(authData);

      const name = Moniker.choose();
      const password = generator.generate({
        length: 20,
        numbers: true
      });

      const auth0User = await managementClient.createUser({
        connection: "Username-Password-Authentication",
        email: email,
        email_verified: true,
        name: name,
        password: password
      });

      await this.usersService.create({
        name: name,
        email: email,
      });

      user = await this.usersService.findOneBy({ email: email });

      await authenticationClient.requestChangePasswordEmail({
        email: email,
        connection: "Username-Password-Authentication",
      });
    }

    // assert user is not null/undefined
    this.invitationRepository.save({
      user_id: user.id,
      group_id: group_id
    });
  }

  findAll(user: User) {
    return this.invitationRepository.find({
      where: { user_id: user.id },
      relations: [ 'user', 'group' ]
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} invitation`;
  }

  update(id: number, updateInvitationDto: UpdateInvitationDto) {
    return `This action updates a #${id} invitation`;
  }

  async accept(id: number) {
    const invitation = await this.invitationRepository.findOne(id);
    const group = await this.groupsService.findOne(invitation.group_id);
    const user = await this.usersService.findOne(invitation.user_id);

    group.users.push(user);
    await this.groupsService.update(group.id, group);
    await this.remove(invitation.id);
  }

  async remove(id: number) {
    await this.invitationRepository.delete(id);
  }
}
