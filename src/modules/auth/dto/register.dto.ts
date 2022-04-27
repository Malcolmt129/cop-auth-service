import { IsString, IsNotEmpty, IsDefined } from "class-validator";

export class RegisterDto {
    
    @IsString()
    @IsNotEmpty()
    @IsDefined()
    username: string

    @IsString()
    @IsNotEmpty()
    @IsDefined()
    password: string

    // add more attributes as needed ...
}