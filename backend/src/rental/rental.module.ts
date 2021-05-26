import { Module } from '@nestjs/common';
import { RentalService } from './rental.service';
import { RentalController } from './rental.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rental } from './entities/rental.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Rental])
  ],
  controllers: [RentalController],
  providers: [RentalService]
})
export class RentalModule {}
