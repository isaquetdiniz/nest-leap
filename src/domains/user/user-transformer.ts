import { User, UserDTO } from './user';

export class UserTransformer {
  static generateDTO(user: User): UserDTO {
    return {
      id: user.id,
      isAdmin: user.isAdmin,
      enabled: user.enabled,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
