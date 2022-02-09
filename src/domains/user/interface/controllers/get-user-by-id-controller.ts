import { Validation } from '@/shared/interface/validation/protocols';
import {
  UserDTO,
  GetUserByIdUsecase,
  IGetUserByIdRepository,
  IGetUserByEmailInCloudRepository,
  UserTransformer,
} from '@/domains/user';
import { ValidationException } from '@/shared/helpers';

export interface GetUserByIdRequest {
  id: string;
}

export type GetUserByIdResponse = { user: UserDTO } | null;

export class GetUserByIdController {
  private usecase: GetUserByIdUsecase;

  constructor(
    getUserByIdRepository: IGetUserByIdRepository,
    getUserByEmailInCloudRepository: IGetUserByEmailInCloudRepository,
    private readonly validation: Validation
  ) {
    this.usecase = new GetUserByIdUsecase(
      getUserByIdRepository,
      getUserByEmailInCloudRepository
    );
  }

  async execute(request: GetUserByIdRequest): Promise<GetUserByIdResponse> {
    const { id } = request;

    const hasErrors = this.validation.validate(request);

    if (hasErrors) {
      throw new ValidationException(hasErrors);
    }

    const user = await this.usecase.execute(id);

    if (!user) {
      return null;
    }

    const userDTO = UserTransformer.generateDTO(user);

    return { user: userDTO };
  }
}
