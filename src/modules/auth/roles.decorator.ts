import { SetMetadata } from '@nestjs/common';
import { UserRole } from '../user/dto/update-user.dto';

export const ROLES_KEY = 'roles';

export const Roles = (...args: UserRole[]) => SetMetadata(ROLES_KEY, args);
