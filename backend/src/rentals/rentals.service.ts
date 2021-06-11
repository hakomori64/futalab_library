import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Borrow } from 'src/borrow/entities/borrow.entity';
import { Return } from 'src/return/entities/return.entity';
import { Repository } from 'typeorm';
import { CreateRentalDto } from './dto/create-rental.dto';
import { UpdateRentalDto } from './dto/update-rental.dto';

@Injectable()
export class RentalsService {
  constructor(
    @InjectRepository(Return)
    private returnRepository: Repository<Return>,
    @InjectRepository(Borrow)
    private borrowRepository: Repository<Borrow>
  ) {}

  create(createRentalDto: CreateRentalDto) {
    return 'This action adds a new rental';
  }

  async findAll() {
    const returns = (await this.returnRepository.find({ relations: ["book"] })).map(rtn => {
      return {
        "type": "return",
        ...rtn,
      };
    })
    const borrows = (await this.borrowRepository.find({ relations: ["book"]})).map(borrow => {
      return {
        "type": "borrow",
        ...borrow,
      };
    })
    return [...returns, borrows].sort((a : any, b : any) => (a.date as Date) < (b.date as Date) ? 1 : -1);
  }

  findOne(id: number) {
    return `This action returns a #${id} rental`;
  }

  update(id: number, updateRentalDto: UpdateRentalDto) {
    return `This action updates a #${id} rental`;
  }

  remove(id: number) {
    return `This action removes a #${id} rental`;
  }
}
