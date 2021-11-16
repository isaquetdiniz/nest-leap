import { LoadUserByTokenCloudUsecase } from '@/domain/usecases/auth';
import { makeCognitLoadUserByTokenInCloudProvider } from '@/main/factories/infra/cloud/cognito';
import { LoadUserByTokenCloudService } from '@/application/services/auth';

export const makeLoadUserByTokenCloudService =
  (): LoadUserByTokenCloudUsecase => {
    const loadUserByTokenInCloudProvider =
      makeCognitLoadUserByTokenInCloudProvider();

    return new LoadUserByTokenCloudService({
      loadUserByTokenInCloudProvider,
    });
  };
