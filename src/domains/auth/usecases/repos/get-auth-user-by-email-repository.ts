import { AuthUser } from '@/domains/auth';

export interface IGetAuthUserByEmailRepository {
  get(email: string): IGetAuthUserByEmailRepository.Result;
}

export namespace IGetAuthUserByEmailRepository {
  export type Result = Promise<AuthUser | null>;
}
