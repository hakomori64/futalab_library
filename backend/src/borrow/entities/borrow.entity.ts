import { Book } from 'src/book/entities/book.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity({name: 'borrows'})
export class Borrow {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100 })
    user_name: string;

    @Column()
    book_id: number;

    @ManyToOne(type => Book, (book) => book.borrows)
    @JoinColumn({
        name: 'book_id',
        referencedColumnName: 'id'
    })
    book: Book;

    @Column()
    quantity: number;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    date: Date;
}
