import { User, UserConfirmation } from '@/users/domain';

export interface IUserConfirmationRepository {
  save(userConfirmation: UserConfirmation): Promise<UserConfirmation>;
  update(userConfirmation: UserConfirmation): Promise<UserConfirmation>;
  getByUserAndIsPending(user: User): Promise<UserConfirmation>;
}
