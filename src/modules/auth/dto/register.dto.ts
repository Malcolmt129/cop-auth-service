import { IsString, IsNotEmpty, IsDefined } from "class-validator";

export class RegisterDto {
    @IsString()
    @IsNotEmpty()
    @IsDefined()
    public username: string;

    @IsString()
    @IsNotEmpty()
    @IsDefined()
    public password: string;

    // add more attributes as needed ...
}