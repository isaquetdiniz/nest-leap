import { AuthMiddleware } from '@/presentation/http/middlewares/auth';
import { makeLoadUserByTokenService } from '@/main/factories/services/auth';
import { makeAuthMiddlewareValidation } from '@/main/factories/validation/auth';

export const makeAuthMiddleware = (role: 'ADMIN' | 'USER'): AuthMiddleware => {
  const validation = makeAuthMiddlewareValidation();
  const loadUserByTokenService = makeLoadUserByTokenService();
  return new AuthMiddleware(validation, loadUserByTokenService, role);
};
