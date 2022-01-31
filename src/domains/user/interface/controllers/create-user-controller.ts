import { Validation } from '@/shared/interface/validation/protocols';
import {
  IDeleteUserByIdRepository,
  IGetUserByEmailInCloudRepository,
  UserDTO,
  CreateUserUsecase,
  IGetUserByEmailRepository,
  ISaveUserRepository,
  ISaveUserInCloudRepository,
  UserTransformer,
} from '@/domains/user';
import { ValidationException } from '@/shared/helpers';
import { IUuidGenerator } from '@/shared/protocols';

export interface CreateUserRequest {
  name: string;
  email: string;
  isAdmin?: boolean;
}

export type CreateUserResponse = UserDTO;

export class CreateUserController {
  private usecase: CreateUserUsecase;

  constructor(
    getUserByEmailRepository: IGetUserByEmailRepository,
    getUserByEmailInCloudRepository: IGetUserByEmailInCloudRepository,
    uuidGenerator: IUuidGenerator,
    saveUserRepository: ISaveUserRepository,
    saveUserInCloudRepository: ISaveUserInCloudRepository,
    deleteUserByIdRepository: IDeleteUserByIdRepository,
    private readonly validation: Validation
  ) {
    this.usecase = new CreateUserUsecase(
      getUserByEmailRepository,
      getUserByEmailInCloudRepository,
      uuidGenerator,
      saveUserRepository,
      saveUserInCloudRepository,
      deleteUserByIdRepository
    );
  }

  async execute(request: CreateUserRequest): Promise<CreateUserResponse> {
    const { name, email, isAdmin } = request;

    const hasError = this.validation.validate({
      name,
      email,
      isAdmin,
    });

    if (hasError) {
      throw new ValidationException(hasError);
    }

    const userCreated = await this.usecase.execute({ name, email, isAdmin });

    const userCreatedDTO = UserTransformer.generateDTO(userCreated);

    return userCreatedDTO;
  }
}
