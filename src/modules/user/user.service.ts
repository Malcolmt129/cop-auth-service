import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UpdateUserRoleDto, UserRole } from './dto/update-user.dto';

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

    async findAllUsers(): Promise<Partial<User[]>> {
        /**
         * SELECT id, username
         * FROM user
         */
        return await this.userRepo.find({
            select: ["id", "username", "role"]
        });
    }

    async insertOne(username: string, password: string): Promise<void> {
        const user_entity = await this.userRepo.create({username: username, password: password});
        await this.userRepo.save(user_entity);
    }

    async updateUserRole(id: string, updateUserRoleDto: UpdateUserRoleDto): Promise<void> {
        await this.userRepo.update(id, { role: updateUserRoleDto.role });
    }

    async findUserRole(id: string, username: string): Promise<Partial<User>> {
        /**
         * 
         * SELECT id, role
         * FROM 'user'
         * WHERE 
         *  user.username = {username}
         *  user.id = {id}
         * 
         */
        return await this.userRepo.findOne({
            select: ["id", "role"],
            where: {
                id: id
            }
        });
    }
}
