import { Group } from 'src/groups/entities/group.entity';
import { Column, Entity, Index, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

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
}
