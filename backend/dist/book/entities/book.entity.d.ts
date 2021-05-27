import { Rental } from 'src/rental/entities/rental.entity';
export declare class Book {
    id: number;
    title: string;
    isbn: string;
    quantity: number;
    rentals: Rental[];
}
