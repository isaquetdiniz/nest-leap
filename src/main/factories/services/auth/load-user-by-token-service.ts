import { LoadUserByTokenUsecase } from '@/application/usecases/auth';
import { LoadUserByTokenService } from '@/application/services/auth';
import { makeLoadUserByTokenCloudService } from '@/main/factories/services/auth';
import { makeListUsersUsecase } from '@/main/factories/services/user';

export const makeLoadUserByTokenService = (): LoadUserByTokenUsecase => {
  const loadUserByTokenCloudUsecase = makeLoadUserByTokenCloudService();
  const listUsersUsecase = makeListUsersUsecase();

  return new LoadUserByTokenService({
    loadUserByTokenCloudUsecase,
    listUsersUsecase,
  });
};
