import { IsDefined, IsEnum } from "class-validator";

export enum UserRole {
    ADMIN = "admin",
    DIRECTOR = "director",
    AUDITOR = "auditor",
    CLERK = "clerk",
    STUDENT = "student",
    INSTRUCTOR = "instructor",
    USER = "user",
    MOKJANG_LEADER = "mokjang leader",
    SARANGBANG_LEADER = "sarangbang leader",
    TEACHER = "teacher",
    ACCOUNTANT = "accountant"
}

export class UpdateUserRoleDto {
    @IsDefined()
    @IsEnum(UserRole)
    role: UserRole
}