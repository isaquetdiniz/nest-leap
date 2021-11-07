import { Controller } from '@/presentation/http/protocols';
import { makeLogControllerDecorator } from '@/main/factories/controllers';
import { makeRefreshTokenCloudService } from '@/main/factories/services/auth';
import { makeRefreshTokenValidation } from '@/main/factories/validation/auth';
import { RefreshTokenController } from '@/presentation/http/controllers/auth';

export const makeRefreshTokenController = (): Controller => {
  const refreshTokenUsecase = makeRefreshTokenCloudService();

  const validation = makeRefreshTokenValidation();

  const refreshTokenController = new RefreshTokenController(
    validation,
    refreshTokenUsecase
  );

  const refreshTokenControllerWithLogDecorator = makeLogControllerDecorator(
    refreshTokenController
  );

  return refreshTokenControllerWithLogDecorator;
};
