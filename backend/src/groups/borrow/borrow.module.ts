import { Module, NestModule, RequestMethod } from '@nestjs/common';
import { BorrowService } from './borrow.service';
import { BorrowController } from './borrow.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Borrow } from './entities/borrow.entity';
import { MiddlewareConsumer } from '@nestjs/common';
import { AuthenticationMiddleware } from 'src/common/middleware/authentication.middleware';

@Module({
  imports: [
    TypeOrmModule.forFeature([Borrow])
  ],
  controllers: [BorrowController],
  providers: [BorrowService]
})
export class BorrowModule implements NestModule {
  configure(consumer: MiddlewareConsumer): MiddlewareConsumer | void {
    // consumer.apply(AuthenticationMiddleware)
    //         .forRoutes(BorrowController)
  }
}
