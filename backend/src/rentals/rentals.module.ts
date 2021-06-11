import { Module } from '@nestjs/common';
import { RentalsService } from './rentals.service';
import { RentalsController } from './rentals.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Borrow } from 'src/borrow/entities/borrow.entity';
import { Return } from 'src/return/entities/return.entity';
import { ReturnModule } from 'src/return/return.module';
import { BorrowModule } from 'src/borrow/borrow.module';

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
