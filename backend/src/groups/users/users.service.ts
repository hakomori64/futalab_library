import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Group } from '../entities/group.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Group)
    private groupRepository: Repository<Group>,
  ) {}

  findAll(group_id: number) {
    return this.userRepository.find({
      join: { alias: 'users', innerJoin: { groups: 'users.groups' }},
      relations: ['groups'],
      where: qb => {
        qb.where('groups.id = :id', { id: group_id });
      },
    });
  }

  findOne(group_id: number, id: number) {
    return this.userRepository.findOne(id, {
      join: { alias: 'users', innerJoin: { groups: 'users.groups' }},
      relations: ['groups'],
      where: qb => {
        qb.where('groups.id = :id', { id: group_id });
      },
    });
  }

  async addGroup(user_id: number, group_id: number) {
    const user = await this.userRepository.findOne(user_id);
    const group = await this.groupRepository.findOne(group_id, { relations: ['users'] });
    if (group != null && user != null) {
      user.groups.push(group);
      await this.userRepository.save(user);
    }
  }
}
