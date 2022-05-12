import { Controller, Get, HttpCode } from '@nestjs/common';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

@Controller()
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get('/users')
    @HttpCode(200)
    async getAllUsers(): Promise<Partial<User[]>> {
        return await this.userService.findAllUsers();
    }

}
