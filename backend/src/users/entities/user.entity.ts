import { Borrow } from 'src/groups/borrow/entities/borrow.entity';
import { Group } from 'src/groups/entities/group.entity';
import { Return } from 'src/groups/return/entities/return.entity';
import { Column, Entity, Index, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({name: 'users'})
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 1024 })
    @Index({ unique: true })
    email: string;

    @Column({ length: 1024 })
    @Index({ unique: true })
    sub: string;

    @Column({ nullable: true, type: 'varchar', length: 1024 })
    name: string | null;

    @ManyToMany((type) => Group, group => group.users)
    @JoinTable()
    groups: Group[];

    @OneToMany((type) => Return, (rtn: Return) => rtn.user)
    returns: Return[];

    @OneToMany((type) => Borrow, (borrow: Borrow) => borrow.user)
    borrows: Borrow[];
}
