import { Validation } from '@/application/validation/protocols';
import {
  IDeleteUserByEmailInCloudRepository,
  IDeleteUserByIdRepository,
  IGetUserByEmailInCloudRepository,
  IGetUserByIdRepository,
  DeleteUserByIdUsecase,
} from '@/domains/user';
import { ValidationException } from '@/shared/helpers';

export interface DeleteUserByIdRequest {
  id: string;
}

export type DeleteUserByIdResponse = void;

export class DeleteUserByIdController {
  private usecase: DeleteUserByIdUsecase;

  constructor(
    getUserByIdRepository: IGetUserByIdRepository,
    getUserByEmailInCloudRepository: IGetUserByEmailInCloudRepository,
    deleteUserByEmailInCloudRepository: IDeleteUserByEmailInCloudRepository,
    deleteUserByIdRepository: IDeleteUserByIdRepository,
    private readonly validation: Validation
  ) {
    this.usecase = new DeleteUserByIdUsecase(
      getUserByIdRepository,
      getUserByEmailInCloudRepository,
      deleteUserByEmailInCloudRepository,
      deleteUserByIdRepository
    );
  }

  async execute(
    request: DeleteUserByIdRequest
  ): Promise<DeleteUserByIdResponse> {
    const { id } = request;

    const hasError = this.validation.validate({ id });

    if (hasError) {
      throw new ValidationException(hasError);
    }

    await this.usecase.execute(id);
  }
}
