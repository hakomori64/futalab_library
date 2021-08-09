import { Invitation } from 'src/groups/invitations/entities/invitation.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Book } from '../book/entities/book.entity';
import { Borrow } from '../borrow/entities/borrow.entity';
import { Return } from '../return/entities/return.entity';

@Entity({name: 'groups'})
export class Group {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 1024 })
    str_id: string;

    @Column({ length: 1024 })
    name: string;

    @ManyToMany((type) => User, user => user.groups)
    users: User[];

    @OneToMany((type) => Book, (book: Book) => book.group)
    books: Book[];

    @OneToMany((type) => Return, (rtn: Return) => rtn.group)
    returns: Return[];

    @OneToMany((type) => Borrow, (borrow: Borrow) => borrow.group)
    borrows: Borrow[];

    @OneToMany((type) => Invitation, (invitation: Invitation) => invitation.group)
    invitations: Invitation[];
}
