import { TypeRole, TypeRoleValues } from './models';

export namespace CommonHelpers {
  export function GetAllRoles(): TypeRole[] {
    const roles: TypeRole[] = [];
    TypeRoleValues.forEach((key, index) => {
      roles.push(key);
    });

    return roles;
  }
}
