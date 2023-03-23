import { User, UserForgotPassword } from '@/users/domain';

export interface IUserForgotPasswordRepository {
  save(userForgotPassword: UserForgotPassword): Promise<UserForgotPassword>;
  update(userForgotPassword: UserForgotPassword): Promise<UserForgotPassword>;
  getByUserAndIsPending(userForgotPassword: User): Promise<UserForgotPassword>;
}
