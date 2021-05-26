import { Book } from 'src/book/entities/book.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity({name: 'rentals'})
export class Rental {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100 })
    borrower_name: string;

    @ManyToOne(type => Book, (book) => book.rentals)
    @JoinColumn({ name: 'book_id' })
    book: Book;

    @Column()
    quantity: number;
}
