import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Repository } from 'typeorm';
import { Book } from './entities/book.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private bookRepository: Repository<Book>
  ) {}
  
  create(createBookDto: CreateBookDto) {
    return this.bookRepository.save(createBookDto);
  }

  findAll() {
    return this.bookRepository.find({ relations: ["rentals"] });
  }

  findOne(id: number) {
    return this.bookRepository.findOne(id);
  }

  update(id: number, updateBookDto: UpdateBookDto) {
    return this.bookRepository.save({ ...updateBookDto, id: Number(id) });
  }

  async remove(id: number): Promise<void> {
    await this.bookRepository.delete(id);
  }

  async setPhoto(id: number, photo_url: string) {
    await this.bookRepository.save({ id: id, photo_url: photo_url });
  }
}
