import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { User } from '../user/entities/user.entity';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
        ) {}

    async validateUser(username: string, password: string): Promise<any> {
        const user = await this.userService.findOne(username);
        if (!user) {
            throw new NotFoundException(`User with the username ${username}, does not exist.`);
        }
        if (await bcrypt.compare(password, user.password)) {
            const { password, ...result } = user; //... means everything but password basically
            return result; // return only the username and userId
        }
        return null;
    }

    async login(user: Partial<User>) { // change type to be User entity
        const payload = { username: user.username, sub: user.id };
        return { access_token: this.jwtService.sign(payload) }; // add salt
    }

    async register(username: string, password: string) {
        let user = await this.userService.findOne(username);
        if (user) {
            throw new BadRequestException(`Bad Request, ${username} already in use`);
        }
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        await this.userService.insertOne(username, hash);
        user = await this.userService.findOne(username);

        return await this.login(user);
    }
}
