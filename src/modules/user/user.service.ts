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
        const users = await this.userRepo.find({
            select: ["id", "username", "password"],
            where: { username: username }
        });
        return users[0];
    }

    async insertOne(username: string, password: string): Promise<void> {
        await this.userRepo.save({username: username, password: password});
    }
}
