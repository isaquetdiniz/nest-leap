import { User } from '@/users/domain';
import { UserDTO } from '@/users/interface';

export class UserPresenter {
  static format(user: User): UserDTO {
    return {
      id: user.id,
      state: user.state,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
