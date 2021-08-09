import { Module } from '@nestjs/common';
import { InvitationsService } from './invitations.service';
import { InvitationsController } from './invitations.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Invitation } from './entities/invitation.entity';
import { UsersModule } from 'src/users/users.module';
import { GroupsModule } from 'src/groups/groups.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Invitation]),
    UsersModule,
    GroupsModule,
  ],
  controllers: [InvitationsController],
  providers: [InvitationsService]
})
export class InvitationsModule {}
