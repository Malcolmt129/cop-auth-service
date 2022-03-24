import { IsString, IsNotEmpty, IsDefined } from "class-validator";

export class LoginDto {
    @IsString()
    @IsNotEmpty()
    @IsDefined()
    public username: string;

    @IsString()
    @IsNotEmpty()
    @IsDefined()
    public password: string;
}