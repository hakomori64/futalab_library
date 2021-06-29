import { Expose } from 'class-transformer';
import { Borrow } from 'src/borrow/entities/borrow.entity';
import { Return } from 'src/return/entities/return.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, AfterLoad } from 'typeorm';

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

    @Expose()
    public get remain(): number {
        const borrowed_history_sum = this.borrows.reduce((sum, borrow) => sum + borrow.quantity, 0);
        const returned_history_sum = this.returns.reduce((sum, rtn) => sum + rtn.quantity, 0);

        return this.quantity - borrowed_history_sum + returned_history_sum;
    }

    @OneToMany((type) => Borrow, (borrow: Borrow) => borrow.book)
    borrows: Borrow[];

    @Column()
    cover_image_url: string;

    @OneToMany((type) => Return, (rtn: Return) => rtn.book)
    returns: Return[];
}
