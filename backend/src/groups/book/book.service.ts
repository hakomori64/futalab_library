import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { SetBookDto } from './dto/set-book.dto';
import { Repository } from 'typeorm';
import { Book } from './entities/book.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,
  ) {}

  create(createBookDto: CreateBookDto) {
    return this.bookRepository.save(createBookDto);
  }

  findAll(group_id: number) {
    return this.bookRepository.find({ where: { group_id }, relations: ['borrows', 'returns'] });
  }

  findOne(group_id: number, id: number) {
    return this.bookRepository.findOne(id, { where: { group_id }, relations: ['borrows', 'returns'] });
  }

  update(id: number, updateBookDto: UpdateBookDto) {
    return this.bookRepository.save({ ...updateBookDto, id: Number(id) });
  }

  async set(id: number, setBookDto: SetBookDto) {
    try {
      await this.bookRepository.createQueryBuilder('books')
      .update(Book)
      .whereInIds([id])
      .set(setBookDto)
      .execute();

      return this.bookRepository.findOne(id, { relations: ['borrows', 'returns' ]});
    } catch (exception) {
      console.log(exception);
      return {
        error: 'something went wrong',
      };
    }
  }

  async remove(id: number): Promise<void> {
    await this.bookRepository.delete(id);
  }
}
