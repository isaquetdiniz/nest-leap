import { User } from '@/users/domain';

export type UserDTO = Pick<
  User,
  'id' | 'state' | 'enabled' | 'name' | 'email' | 'createdAt' | 'updatedAt'
>;
