// user.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../Entities/User.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    saltOrRounds: number = 10;

    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
    ) { }

    async findAll(): Promise<UserEntity[]> {
        return this.userRepository.find();
    }

    async findOne(id: number): Promise<UserEntity> {
        return this.userRepository.findOneBy({ id })
    }
    async findByEmail(email: string): Promise<UserEntity> {
        return this.userRepository.findOneBy({ email })
    }

    async createUser(user: UserEntity): Promise<UserEntity> {
        return this.userRepository.save(user);
    }

    async updateUser(id: number, user: UserEntity): Promise<UserEntity> {
        await this.userRepository.update(id, user);
        return this.userRepository.findOneBy({ id });
    }

    async deleteUser(id: number): Promise<void> {
        await this.userRepository.delete(id);
    }
}
