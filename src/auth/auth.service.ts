import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';

@Injectable()
export class AuthService {
    private readonly users: User[];

    async loginUser(loginDto: LoginDto): Promise<User[]> {
        // get user from db
    }

    async registerUser(registerDto: RegisterDto): Promise<null> {
        // insert user into db
    }
}
