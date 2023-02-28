import { DeleteUserByIdUsecase, IUserRepository } from '@/users/application';
import { ILoggerProvider } from '@/core/application';
import { Controller, IValidation } from '@/core/interface';

export type IDeleteUserByIdRequest = {
  id: string;
};

export type IDeleteUserByIdResponse = void;

export class DeleteUserByIdController extends Controller<
  IDeleteUserByIdRequest,
  IDeleteUserByIdResponse
> {
  private usecase: DeleteUserByIdUsecase;

  constructor(
    userRepository: IUserRepository,
    validation: IValidation,
    logger: ILoggerProvider,
  ) {
    super(validation, logger);

    this.usecase = new DeleteUserByIdUsecase(userRepository, logger);
  }

  async perform(
    request: IDeleteUserByIdRequest,
  ): Promise<IDeleteUserByIdResponse> {
    await this.usecase.perform(request.id);
  }
}
