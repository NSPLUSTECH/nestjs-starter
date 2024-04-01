// user.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../Entities/User.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) { }

    async findAll(): Promise<User[]> {
        return this.userRepository.find();
    }

    async findOne(id: number): Promise<User> {
        return this.userRepository.findOneBy({ id })
    }

    async createUser(user: User): Promise<User> {
        return this.userRepository.save(user);
    }

    async updateUser(id: number, user: User): Promise<User> {
        await this.userRepository.update(id, user);
        return this.userRepository.findOneBy({ id });
    }

    async deleteUser(id: number): Promise<void> {
        await this.userRepository.delete(id);
    }
}
