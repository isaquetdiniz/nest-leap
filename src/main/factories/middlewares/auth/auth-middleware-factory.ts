import { AuthMiddleware } from '@/application/http-server/middlewares/auth';
import { makeLoadUserByTokenService } from '@/main/factories/usecases/auth';
import { makeAuthMiddlewareValidation } from '@/main/factories/validation/auth';

export const makeAuthMiddleware = (role: 'ADMIN' | 'USER'): AuthMiddleware => {
  const validation = makeAuthMiddlewareValidation();
  const loadUserByTokenService = makeLoadUserByTokenService();
  return new AuthMiddleware(validation, loadUserByTokenService, role);
};
