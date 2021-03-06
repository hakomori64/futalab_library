import { Module } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { GroupsController } from './groups.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Group } from './entities/group.entity';
import { RouterModule } from 'nest-router';
import { route } from './groups.route';
import { BorrowModule } from './borrow/borrow.module';
import { RentalsModule } from './rentals/rentals.module';
import { ReturnModule } from './return/return.module';
import { BookModule } from './book/book.module';
import { GroupUsersModule } from './users/users.module';
import { User } from '../users/entities/user.entity';
import { GroupInvitationsModule } from './invitations/invitations.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Group, User]),
    RouterModule.forRoutes(route),
    BookModule,
    ReturnModule,
    BorrowModule,
    RentalsModule,
    GroupUsersModule,
    GroupInvitationsModule,
  ],
  controllers: [GroupsController],
  providers: [GroupsService],
  exports: [GroupsService],
})
export class GroupsModule {}
