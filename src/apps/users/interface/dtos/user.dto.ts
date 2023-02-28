import { User } from '@/users/domain';

export type UserDTO = Pick<
  User,
  'id' | 'state' | 'name' | 'email' | 'createdAt' | 'updatedAt'
>;
