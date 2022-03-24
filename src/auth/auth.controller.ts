import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("/users/tokens")
  login(@Body() loginDto: LoginDto) {
    // Get User (call to the auth.service)
    // Create a JWT with user Id
    // Return Status 200 and JWT
    console.log("to be implemented");
  }

  @Post("/users")
  register(@Body() registerDto: RegisterDto) {
    // Get user by username (check if exists)
    // if exists then error 400 BAD_REQUEST
    // Register User
    // Call login
    console.log("to be implemented");
  }
}
