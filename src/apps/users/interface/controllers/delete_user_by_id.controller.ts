import { DeleteUserByIdUsecase, IUserRepository } from '@/users/application';
import { IController } from '@/core/interface';
import { User } from '@/users/domain';
import { AutoValidator } from '@/libs/class-validator';
import { IsUUID } from 'class-validator';

export type IDeleteUserByIdRequest = Pick<User, 'id'>;

export class DeleteUserByIdRequest
  extends AutoValidator
  implements IDeleteUserByIdRequest
{
  @IsUUID(4)
  id: string;

  constructor(props: IDeleteUserByIdRequest) {
    super(props);
  }
}

export type IDeleteUserByIdResponse = void;

export class DeleteUserByIdController
  implements IController<IDeleteUserByIdRequest, IDeleteUserByIdResponse>
{
  private usecase: DeleteUserByIdUsecase;

  constructor(userRepository: IUserRepository) {
    this.usecase = new DeleteUserByIdUsecase(userRepository);
  }

  async execute(
    request: IDeleteUserByIdRequest,
  ): Promise<IDeleteUserByIdResponse> {
    await this.usecase.perform(request.id);
  }
}
