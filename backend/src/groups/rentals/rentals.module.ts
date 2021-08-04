import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { RentalsService } from './rentals.service';
import { RentalsController } from './rentals.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Borrow } from '../borrow/entities/borrow.entity';
import { Return } from '../return/entities/return.entity';
import { ReturnModule } from '../return/return.module';
import { BorrowModule } from '../borrow/borrow.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Borrow]),
    TypeOrmModule.forFeature([Return]),
    ReturnModule,
    BorrowModule,
  ],
  controllers: [RentalsController],
  providers: [RentalsService]
})
export class RentalsModule {}
