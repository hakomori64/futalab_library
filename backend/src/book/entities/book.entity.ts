import { Rental } from 'src/rental/entities/rental.entity';
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

    @OneToMany((type) => Rental, (rental) => rental.book)
    rentals: Rental[];
}
