import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SetUserDto } from './dto/set-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  create(createUserDto: CreateUserDto) {
    return this.userRepository.save(createUserDto);
  }

  findAll() {
    return this.userRepository.find({ relations: ["groups"] });
  }

  findOne(id: number) {
    return this.userRepository.findOne(id, { relations: ["groups"] })
  }

  findBy(condition: {}) {
    return this.userRepository.findOne(condition);
  } 

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.userRepository.save({ ...updateUserDto, id: Number(id) })
  }

  async set(id: number, setUserDto: SetUserDto) {
    try {
      console.log(setUserDto);
      await this.userRepository.createQueryBuilder('users')
        .update(User)
        .whereInIds([id])
        .set(setUserDto)
        .execute();

      return this.userRepository.findOne(id, { relations: ["groups"] });
    } catch (exception) {
      console.log(exception);
      return {
        "error": "something went wrong"
      };
    }
  }

  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}
