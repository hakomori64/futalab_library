import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBorrowDto } from './dto/create-borrow.dto';
import { UpdateBorrowDto } from './dto/update-borrow.dto';
import { Borrow } from './entities/borrow.entity';

@Injectable()
export class BorrowService {
  constructor(
    @InjectRepository(Borrow)
    private borrowRepository: Repository<Borrow>
  ) {}

  create(createBorrowDto: CreateBorrowDto) {
    return this.borrowRepository.save({
      ...createBorrowDto,
    });
  }

  findAll() {
    return this.borrowRepository.find({ relations: ["book"] });
  }

  findOne(id: number) {
    return this.borrowRepository.findOne(id, { relations: ["book"] });
  }

  update(id: number, updateBorrowDto: UpdateBorrowDto) {
    return this.borrowRepository.save({ ...updateBorrowDto, id: Number(id) });
  }

  async remove(id: number) : Promise<void> {
    await this.borrowRepository.delete(id);
  }
}
