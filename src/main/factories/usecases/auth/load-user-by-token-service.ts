import { LoadUserByTokenUsecase } from '@/domain/usecases/auth';
import { LoadUserByTokenService } from '@/application/services/auth';
import { makeLoadUserByTokenCloudService } from '@/main/factories/usecases/auth';
import { makeListUsersUsecase } from '@/main/factories/usecases/user';

export const makeLoadUserByTokenService = (): LoadUserByTokenUsecase => {
  const loadUserByTokenCloudUsecase = makeLoadUserByTokenCloudService();
  const listUsersUsecase = makeListUsersUsecase();

  return new LoadUserByTokenService({
    loadUserByTokenCloudUsecase,
    listUsersUsecase,
  });
};
