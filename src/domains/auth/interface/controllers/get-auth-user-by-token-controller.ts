import { Validation } from '@/shared/interface/validation/protocols';
import { ValidationException } from '@/shared/helpers';

import {
  IGetAuthUserByEmailRepository,
  AuthUserDTO,
  IGetAuthUserByTokenInCloudGateway,
  AuthUserTransformer,
  GetAuthUserByTokenUsecase,
} from '@/domains/auth';

export interface GetUserByTokenRequest {
  token: string;
}

export type GetUserByTokenResponse = AuthUserDTO;

export class GetAuthUserByTokenController {
  private usecase: GetAuthUserByTokenUsecase;

  constructor(
    getAuthUserByTokenInCloudGateway: IGetAuthUserByTokenInCloudGateway,
    getAuthUserByEmailRepository: IGetAuthUserByEmailRepository,
    private readonly validation: Validation
  ) {
    this.usecase = new GetAuthUserByTokenUsecase(
      getAuthUserByTokenInCloudGateway,
      getAuthUserByEmailRepository
    );
  }

  async execute(
    request: GetUserByTokenRequest
  ): Promise<GetUserByTokenResponse> {
    const hasError = this.validation.validate(request);

    if (hasError) {
      throw new ValidationException(hasError);
    }

    const { token } = request;

    const accessTokenWithouBearer = token.replace('Bearer ', '');

    const authUser = await this.usecase.execute({
      token: accessTokenWithouBearer,
    });

    const autUserDTO = AuthUserTransformer.generateDTO(authUser);

    return autUserDTO;
  }
}
