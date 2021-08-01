import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { GroupsController } from './groups.controller';
import { AuthenticationMiddleware } from 'src/common/middleware/authentication.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Group } from './entities/group.entity';
import { RouterModule } from 'nest-router';
import { route } from './groups.route';
import { BorrowModule } from './borrow/borrow.module';
import { RentalsModule } from './rentals/rentals.module';
import { ReturnModule } from './return/return.module';
import { BookModule } from './book/book.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Group]),
    RouterModule.forRoutes(route),
    BookModule,
    ReturnModule,
    BorrowModule,
    RentalsModule
  ],
  controllers: [GroupsController],
  providers: [GroupsService]
})
export class GroupsModule implements NestModule {
  configure(consumer: MiddlewareConsumer): MiddlewareConsumer | void {
    // consumer.apply(AuthenticationMiddleware)
    //         .forRoutes(GroupsController)
  }
}