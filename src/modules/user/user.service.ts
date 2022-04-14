import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private readonly userRepo: Repository<User>) {}

    async findOne(username: string): Promise<Partial<User>> {
        /**
         * SELECT * FROM 'user'
         * WHERE user.username == {username}
         * 
         * SELECT id, username, password FROM 'user'
         * WHERE user.username == {username}
         */
        return await this.userRepo.findOne({
            select: ["id", "username", "password"],
            where: { username: username }
        });
    }

    async insertOne(username: string, password: string): Promise<void> {
        await this.userRepo.create({username: username, password: password});
    }
}
