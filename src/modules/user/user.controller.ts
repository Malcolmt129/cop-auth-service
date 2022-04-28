import { Body, Controller, Get, HttpCode, Param, Patch, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { UpdateUserRoleDto, UserRole } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

@Controller()
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get('/users')
    @UseGuards(JwtAuthGuard)
    @HttpCode(200)
    async getAllUsers(): Promise<Partial<User[]>> {
        return await this.userService.findAllUsers();
    }

    @Patch('/user/:userId/role')
    @UseGuards(JwtAuthGuard)
    @Roles(UserRole.ADMIN)
    @HttpCode(204)
    async updateUserRole(@Param('userId') id: string, @Body() updateUserRoleDto: UpdateUserRoleDto): Promise<void> {
        await this.userService.updateUserRole(id, updateUserRoleDto);
    }

}
