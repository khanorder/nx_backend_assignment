import { SetMetadata } from '@nestjs/common';
import { TypeRole } from '@nx-assignment/common';

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
export const ROLES_KEY = 'roles';
export const Roles = (...roles: TypeRole[]) => SetMetadata(ROLES_KEY, roles);
