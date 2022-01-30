import { LoadUserByTokenInCloudUsecase } from '@/domain/auth';
import { makeCognitLoadUserByTokenInCloudProvider } from '@/main/factories/infra/cloud/cognito';
import { LoadUserByTokenInCloud } from '@/domain/auth/load-user-by-token-in-cloud/load-user-by-token-in-cloud';

export const makeLoadUserByTokenInCloudUsecase =
  (): LoadUserByTokenInCloudUsecase => {
    const loadUserByTokenInCloudProvider =
      makeCognitLoadUserByTokenInCloudProvider();

    return new LoadUserByTokenInCloud({
      loadUserByTokenInCloudProvider,
    });
  };
