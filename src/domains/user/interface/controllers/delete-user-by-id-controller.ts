import { Validation } from '@/shared/interface/validation/protocols';
import {
  IDeleteUserByEmailInCloudRepository,
  IDeleteUserByIdRepository,
  IGetUserByEmailInCloudRepository,
  IGetUserByIdRepository,
  DeleteUserByIdUsecase,
} from '@/domains/user';
import { ValidationException } from '@/shared/helpers';
import { ILoggerLocal } from '@/shared/protocols';

export interface DeleteUserByIdRequest {
  id: string;
}

export type DeleteUserByIdResponse = void;

export class DeleteUserByIdController {
  private usecase: DeleteUserByIdUsecase;
  private logger: ILoggerLocal;

  constructor(
    getUserByIdRepository: IGetUserByIdRepository,
    getUserByEmailInCloudRepository: IGetUserByEmailInCloudRepository,
    deleteUserByEmailInCloudRepository: IDeleteUserByEmailInCloudRepository,
    deleteUserByIdRepository: IDeleteUserByIdRepository,
    private readonly validation: Validation,
    logger: ILoggerLocal
  ) {
    this.usecase = new DeleteUserByIdUsecase(
      getUserByIdRepository,
      getUserByEmailInCloudRepository,
      deleteUserByEmailInCloudRepository,
      deleteUserByIdRepository,
      logger
    );

    this.logger = logger.child({ controller: 'delete-user-by-id' });
  }

  async execute(
    request: DeleteUserByIdRequest
  ): Promise<DeleteUserByIdResponse> {
    this.logger.logDebug({ message: 'Request Received', data: request });
    const { id } = request;

    const hasError = this.validation.validate({ id });

    if (hasError) {
      throw new ValidationException(hasError);
    }

    this.logger.logDebug({ message: 'Params validated' });

    await this.usecase.execute(id);

    this.logger.logDebug({ message: 'User deleted', data: { id } });
  }
}
