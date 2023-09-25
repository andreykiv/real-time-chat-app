import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { Observable, from } from 'rxjs';

const SERVER_ERRORS = {
  duplicate_entry: 'ER_DUP_ENTRY',
};

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  // TODO: check if user already exists before saving. This will prevent auto-increment of primary key even in case User is not created.
  async create(createUserDto: CreateUserDto): Promise<User | string> {
    const newUser = this.usersRepository.create(createUserDto);
    return await this.usersRepository.save(newUser).catch((err) => {
      if (err.code == SERVER_ERRORS.duplicate_entry) {
        return `Given email already exists in the system. Please provide a different email address.`;
      }
    });
  }

  findAll(): Observable<User[]> {
    return from(this.usersRepository.find());
  }

  findOne(id: number): Promise<User> {
    return this.usersRepository.findOneBy({ id });
  }

  async update(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<User | string> {
    const foundUser = await this.findOne(id).catch((error) => {
      console.log('Error catched when findeOne:', error);
    });

    if (!foundUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    const updated = Object.assign(foundUser, updateUserDto);

    return await this.usersRepository.save(updated);
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
