import { Borrow } from 'src/borrow/entities/borrow.entity';
import { Return } from 'src/return/entities/return.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity({name: 'books'})
export class Book {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 1024 })
    title: string;

    @Column({ length: 100 })
    isbn: string;

    @Column()
    quantity: number;

    @OneToMany((type) => Borrow, (borrow: Borrow) => borrow.book)
    borrows: Borrow[];

    @Column()
    cover_image_url: string;

    @OneToMany((type) => Return, (rtn: Return) => rtn.book)
    returns: Return[];
}
