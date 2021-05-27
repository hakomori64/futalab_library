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
    return this.rentalRepository.save({
      ...createRentalDto,
    });
  }

  findAll() {
    return this.rentalRepository.find({ relations: ["book"] });
  }

  findOne(id: number) {
    return this.rentalRepository.findOne(id, { relations: ["book"] });
  }

  update(id: number, updateRentalDto: UpdateRentalDto) {
    return this.rentalRepository.save({ ...updateRentalDto, id: Number(id) });
  }

  async remove(id: number) : Promise<void> {
    await this.rentalRepository.delete(id);
  }
}
