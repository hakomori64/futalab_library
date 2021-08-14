import { Group } from "../../groups/entities/group.entity";
import { User } from "../../users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'invitations'})
export class Invitation {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    user_id: number;

    @ManyToOne(type => User, (user: User) => user.invitations)
    @JoinColumn({
        name: 'user_id',
        referencedColumnName: 'id'
    })
    user: User;

    @Column()
    group_id: number;
    
    @ManyToOne(type => Group, (group: Group) => group.invitations)
    @JoinColumn({
        name: 'group_id',
        referencedColumnName: 'id'
    })
    group: Group;
}
