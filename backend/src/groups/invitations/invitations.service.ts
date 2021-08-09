import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { ManagementClient, AuthenticationClient } from "auth0";
import { Repository } from 'typeorm';
import { CreateInvitationDto } from './dto/create-invitation.dto';
import { UpdateInvitationDto } from './dto/update-invitation.dto';
import { Invitation } from './entities/invitation.entity';

const Moniker = require("moniker");
const generator = require("generate-password");

@Injectable()
export class InvitationsService {
  private readonly logger = new Logger(InvitationsService.name);
  constructor(
    private readonly usersService: UsersService,
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

  findAll(group_id: number) {
    return this.invitationRepository.find({ where: { group_id }, relations: ["user", "group"]});
  }

  findOne(id: number) {
    return `This action returns a #${id} invitation`;
  }

  update(id: number, updateInvitationDto: UpdateInvitationDto) {
    return `This action updates a #${id} invitation`;
  }

  remove(id: number) {
    return `This action removes a #${id} invitation`;
  }
}
