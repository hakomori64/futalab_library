import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

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
}
