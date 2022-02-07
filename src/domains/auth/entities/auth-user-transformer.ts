import { AuthUser, AuthUserDTO } from './auth-user';

export class AuthUserTransformer {
  static generateDTO(authUser: AuthUser): AuthUserDTO {
    return {
      id: authUser.id,
      isAdmin: authUser.isAdmin,
      name: authUser.name,
      email: authUser.email,
    };
  }
}
