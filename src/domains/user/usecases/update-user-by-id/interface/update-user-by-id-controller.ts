import { Validation } from '@/application/validation/protocols';
import {
  IGetUserByIdRepository,
  IUpdateUserRepository,
  UpdateUserByIdUsecase,
  UserDTO,
  UserTransformer,
} from '@/domains/user';
import { ValidationException } from '@/shared/helpers';

export interface UpdateUserByIdRequest {
  id: string;
  paramsToUpdate: {
    name?: string;
    isAdmin?: boolean;
    isEnabled?: boolean;
  };
}

export type UpdateUserByIdResponse = UserDTO;

export class UpdateUserByIdController {
  private usecase: UpdateUserByIdUsecase;

  constructor(
    getUserByIdRepository: IGetUserByIdRepository,
    updateUserRepository: IUpdateUserRepository,
    private readonly validation: Validation
  ) {
    this.usecase = new UpdateUserByIdUsecase(
      getUserByIdRepository,
      updateUserRepository
    );
  }

  async execute(
    request: UpdateUserByIdRequest
  ): Promise<UpdateUserByIdResponse> {
    const { id, paramsToUpdate } = request;

    const { name, isAdmin, isEnabled } = paramsToUpdate;

    const hasErrors = this.validation.validate({
      id,
      name,
      isAdmin,
      isEnabled,
    });

    if (hasErrors) {
      throw new ValidationException(hasErrors);
    }

    const userUpdated = await this.usecase.execute({ id, paramsToUpdate });

    const userUpdatedDTO = UserTransformer.generateDTO(userUpdated);

    return userUpdatedDTO;
  }
}
