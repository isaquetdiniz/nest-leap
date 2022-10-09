import { User } from '@/users/domain';
import { DefaultFilters } from '@/shared/domain';
import { IRepository } from '@/shared/application';

export type UserFilters = DefaultFilters & {
  name?: string;
  email?: string;
};

export interface IUserRepository extends IRepository<User, UserFilters> {
  getByEmail(email: string): Promise<User | null>;
}
