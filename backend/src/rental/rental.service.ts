import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRentalDto } from './dto/create-rental.dto';
import { UpdateRentalDto } from './dto/update-rental.dto';
import { Rental } from './entities/rental.entity';

@Injectable()
export class RentalService {
  constructor(
    @InjectRepository(Rental)
    private rentalRepository: Repository<Rental>
  ) {}

  create(createRentalDto: CreateRentalDto) {
    return 'This action adds a new rental';
  }

  findAll() {
    return this.rentalRepository.find();
  }

  findOne(id: number) {
    return this.rentalRepository.findOne(id);
  }

  update(id: number, updateRentalDto: UpdateRentalDto) {
    return `This action updates a #${id} rental`;
  }

  async remove(id: number) : Promise<void> {
    await this.rentalRepository.delete(id);
  }
}
