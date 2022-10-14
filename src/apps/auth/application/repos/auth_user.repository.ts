import { AuthUser } from '@/apps/auth/domain';

export interface IAuthUserRepository {
  getByEmail(email: string): Promise<AuthUser | null>;
}
