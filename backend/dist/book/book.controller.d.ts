import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';
export declare class BookController {
    private readonly bookService;
    private readonly logger;
    constructor(bookService: BookService);
    create(createBookDto: CreateBookDto): string;
    findAll(): Promise<Book[]>;
    findOne(id: string): Promise<Book>;
    update(id: string, updateBookDto: UpdateBookDto): string;
    remove(id: string): Promise<void>;
}
