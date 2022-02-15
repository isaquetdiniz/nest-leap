import { AuthUserDTO } from '@/domains/auth';

export interface IGetAuthUserByEmailRepository {
  get(email: string): Promise<AuthUserDTO | null>;
}
