import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Repository } from 'typeorm';
import { Book } from './entities/book.entity';
export declare class BookService {
    private bookRepository;
    constructor(bookRepository: Repository<Book>);
    create(createBookDto: CreateBookDto): string;
    findAll(): Promise<Book[]>;
    findOne(id: number): Promise<Book>;
    update(id: number, updateBookDto: UpdateBookDto): string;
    remove(id: number): Promise<void>;
}
