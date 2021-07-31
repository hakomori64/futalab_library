import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { SetGroupDto } from './dto/set-group.dto';
import { Group } from './entities/group.entity';

@Injectable()
export class GroupsService {
  constructor(
    @InjectRepository(Group)
    private groupRepository: Repository<Group>
  ) {}

  create(createGroupDto: CreateGroupDto) {
    return this.groupRepository.save(createGroupDto);
  }

  findAll() {
    return this.groupRepository.find({ relations: ["users"] })
  }

  findOne(id: number) {
    return this.groupRepository.findOne(id, { relations: ["users"] })
  }

  update(id: number, updateGroupDto: UpdateGroupDto) {
    return this.groupRepository.save({ ...updateGroupDto, id: Number(id) });
  }

  async set(id: number, setGroupDto: SetGroupDto) {
    try {
      console.log(setGroupDto);
      await this.groupRepository.createQueryBuilder('groups')
        .update(Group)
        .whereInIds([id])
        .set(setGroupDto)
        .execute();
      
      return this.groupRepository.findOne(id, { relations: ["users"] });
    } catch (exception) {
      console.log(exception);
      return {
        "error": "something went wrong"
      };
    }
  }

  async remove(id: number): Promise<void> {
    await this.groupRepository.delete(id);
  }
}
