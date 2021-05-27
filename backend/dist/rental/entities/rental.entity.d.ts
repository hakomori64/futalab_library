import { Book } from 'src/book/entities/book.entity';
export declare class Rental {
    id: number;
    borrower_name: string;
    book: Book;
    quantity: number;
}
