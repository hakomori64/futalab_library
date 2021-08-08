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
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Group, User]),
    RouterModule.forRoutes(route),
    BookModule,
    ReturnModule,
    BorrowModule,
    RentalsModule,
    GroupUsersModule,
  ],
  controllers: [GroupsController],
  providers: [GroupsService],
})
export class GroupsModule {}
