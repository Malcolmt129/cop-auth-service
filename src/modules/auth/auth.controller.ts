import { Controller, Post, Body, Request, UseGuards, Patch, Param, HttpCode } from '@nestjs/common';
import { UpdateUserRoleDto, UserRole } from '../user/dto/update-user.dto';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { Roles } from './roles.decorator';

@Controller("auth")
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService  
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post("/login")
  login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post("/register")
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto.username, registerDto.password);
  }

  @Patch('/user/:userId/role')
  @UseGuards(JwtAuthGuard)
  // @Roles(UserRole.ADMIN)
  @HttpCode(204)
  async updateUserRole(@Param('userId') id: string, @Body() updateUserRoleDto: UpdateUserRoleDto): Promise<void> {
      await this.userService.updateUserRole(id, updateUserRoleDto);
  }

}
