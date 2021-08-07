import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Borrow } from '../borrow/entities/borrow.entity';
import { Return } from '../return/entities/return.entity';
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

  async findAll(group_id: number) {
    const returns = (await this.returnRepository.find({ where: { group_id: group_id }, relations: ["book", "user"] })).map(rtn => {
      return {
        "type": "return",
        ...rtn,
      };
    })
    const borrows = (await this.borrowRepository.find({ where: {group_id: group_id}, relations: ["book", "user"]})).map(borrow => {
      return {
        "type": "borrow",
        ...borrow,
      };
    })
    return [...returns, ...borrows].sort((a : any, b : any) => (a.date as Date) < (b.date as Date) ? 1 : -1);
  }
}
