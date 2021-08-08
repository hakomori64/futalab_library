import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateReturnDto } from './dto/create-return.dto';
import { UpdateReturnDto } from './dto/update-return.dto';
import { Return } from './entities/return.entity';

@Injectable()
export class ReturnService {
  constructor(
    @InjectRepository(Return)
    private returnRepository: Repository<Return>,
  ) {}

  create(createReturnDto: CreateReturnDto) {
    return this.returnRepository.save({
      ...createReturnDto,
    });
  }

  findAll() {
    return this.returnRepository.find({ relations: ['book'] });
  }

  findOne(id: number) {
    return this.returnRepository.findOne(id, { relations: ['book'] });
  }

  update(id: number, updateReturnDto: UpdateReturnDto) {
    return this.returnRepository.save({ ...UpdateReturnDto, id: Number(id) });
  }

  async remove(id: number): Promise<void> {
    await this.returnRepository.delete(id);
  }
}
