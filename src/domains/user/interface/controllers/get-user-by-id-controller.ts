import { Validation } from '@/shared/interface/validation/protocols';
import {
  User,
  GetUserByIdUsecase,
  IGetUserByIdRepository,
  IGetUserByEmailInCloudRepository,
} from '@/domains/user';
import { ValidationException } from '@/shared/helpers';
import { ILoggerLocal } from '@/shared/protocols';

export interface GetUserByIdRequest {
  id: string;
}

export type GetUserByIdResponse = User | null;

export class GetUserByIdController {
  private usecase: GetUserByIdUsecase;
  private logger: ILoggerLocal;

  constructor(
    getUserByIdRepository: IGetUserByIdRepository,
    getUserByEmailInCloudRepository: IGetUserByEmailInCloudRepository,
    private readonly validation: Validation,
    logger: ILoggerLocal
  ) {
    this.usecase = new GetUserByIdUsecase(
      getUserByIdRepository,
      getUserByEmailInCloudRepository,
      logger
    );

    this.logger = logger.child({ controller: 'get-user-by-id' });
  }

  async execute(request: GetUserByIdRequest): Promise<GetUserByIdResponse> {
    this.logger.logDebug({ message: 'Request Received', data: request });

    const { id } = request;

    const hasErrors = this.validation.validate(request);

    if (hasErrors) {
      throw new ValidationException(hasErrors);
    }

    this.logger.logDebug({ message: 'Params Validated' });

    const user = await this.usecase.execute(id);

    this.logger.logDebug({ message: 'User found', data: user });

    if (!user) {
      return null;
    }

    return user;
  }
}
