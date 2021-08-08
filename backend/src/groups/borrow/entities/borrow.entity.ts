import { Book } from '../../book/entities/book.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Group } from 'src/groups/entities/group.entity';
import { User } from 'src/users/entities/user.entity';

@Entity({name: 'borrows'})
export class Borrow {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    user_id: number;

    @ManyToOne(type => User, (user: User) => user.borrows)
    @JoinColumn({
        name: 'user_id',
        referencedColumnName: 'id',
    })
    user: User;

    @Column()
    book_id: number;

    @ManyToOne(type => Book, (book) => book.borrows)
    @JoinColumn({
        name: 'book_id',
        referencedColumnName: 'id',
    })
    book: Book;

    @Column()
    group_id: number;

    @ManyToOne((type) => Group, (group: Group) => group.borrows)
    group: Group;

    @Column()
    quantity: number;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    date: Date;
}
