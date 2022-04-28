import { IsDefined, IsEnum } from "class-validator";

export enum UserRole {
    ADMIN = "admin",
    DIRECTOR = "director",
    AUDITOR = "auditor",
    CLERK = "clerk"
}

export class UpdateUserRoleDto {
    @IsDefined()
    @IsEnum(UserRole)
    role: UserRole
}