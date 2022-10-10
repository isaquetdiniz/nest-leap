import {
  DeleteUserByIdUsecase,
  IUserCloudService,
  IUserRepository,
} from '@/users/application';
import { ILoggerProvider } from '@/shared/application';
import { IController, IValidation } from '@/shared/interface';

export type IDeleteUserByIdRequest = {
  id: string;
};

export type IDeleteUserByIdResponse = void;

export class DeleteUserByIdController
  implements IController<IDeleteUserByIdRequest, IDeleteUserByIdResponse>
{
  private usecase: DeleteUserByIdUsecase;

  constructor(
    userRepository: IUserRepository,
    userCloudService: IUserCloudService,
    private readonly validation: IValidation,
    private readonly logger: ILoggerProvider,
  ) {
    this.usecase = new DeleteUserByIdUsecase(
      userRepository,
      userCloudService,
      logger,
    );
  }

  async execute(
    request: IDeleteUserByIdRequest,
  ): Promise<IDeleteUserByIdResponse> {
    this.logger.debug({ message: 'Request Received', data: request });

    this.validation.request(request);

    this.logger.debug({ message: 'Params validated' });

    await this.usecase.perform(request.id);

    this.logger.debug({ message: 'User deleted', data: { id: request.id } });
  }
}
