import { adaptMiddleware } from '@/main/adapters';
import { makeAuthMiddleware } from '@/main/factories/middlewares/auth';

export const authMiddleware = (role: 'ADMIN' | 'USER') => {
  return adaptMiddleware(makeAuthMiddleware(role));
};
