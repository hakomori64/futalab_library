import { Borrow } from '../../groups/borrow/entities/borrow.entity';
import { Group } from '../../groups/entities/group.entity';
import { Return } from '../../groups/return/entities/return.entity';
import { Invitation } from '../../invitations/entities/invitation.entity';
import { Column, Entity, Index, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({name: 'users'})
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 255 })
    @Index({ unique: true })
    email: string;

    @Column({ nullable: true, type: 'varchar', length: 1024 })
    name: string | null;

    @ManyToMany((type) => Group, group => group.users)
    @JoinTable()
    groups: Group[];

    @OneToMany((type) => Return, (rtn: Return) => rtn.user)
    returns: Return[];

    @OneToMany((type) => Borrow, (borrow: Borrow) => borrow.user)
    borrows: Borrow[];

    @OneToMany((type) => Invitation, (invitation: Invitation) => invitation.user)
    invitations: Invitation[];
}
