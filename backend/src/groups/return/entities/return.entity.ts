import { Book } from '../../book/entities/book.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Group } from 'src/groups/entities/group.entity';
import { User } from 'src/users/entities/user.entity';

@Entity({name: 'returns'})
export class Return {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    user_id: number;

    @ManyToOne(type => User, (user: User) => user.returns)
    @JoinColumn({
        name: 'user_id',
        referencedColumnName: 'id'
    })
    user: User;

    @Column()
    book_id: number;

    @ManyToOne(type => Book, (book) => book.returns)
    @JoinColumn({
        name: 'book_id',
        referencedColumnName: 'id'
    })
    book: Book;

    @Column()
    group_id: number;

    @ManyToOne(type => Group, (group: Group) => group.returns)
    @JoinColumn({
        name: 'group_id',
        referencedColumnName: 'id'
    })
    group: Group;

    @Column()
    quantity: number;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    date: Date;
}
