import {
  User,
  IGetUserByIdRepository,
  IUpdateUserRepository,
  UserNotFoundException,
  UserTransformer,
} from '@/domains/user';

export interface IUpdateUserByIdUsecase {
  execute(
    updateParams: IUpdateUserByIdUsecase.Params
  ): Promise<IUpdateUserByIdUsecase.Result>;
}

export namespace IUpdateUserByIdUsecase {
  export type Params = {
    id: string;
    paramsToUpdate: {
      name?: string;
      isAdmin?: boolean;
      enabled?: boolean;
    };
  };
  export type Result = User;
}

export class UpdateUserByIdUsecase implements IUpdateUserByIdUsecase {
  constructor(
    private readonly getUserByIdRepository: IGetUserByIdRepository,
    private readonly updateUserRepository: IUpdateUserRepository
  ) {}

  async execute(
    updateParams: IUpdateUserByIdUsecase.Params
  ): Promise<IUpdateUserByIdUsecase.Result> {
    const { id, paramsToUpdate } = updateParams;

    const userExists = await this.getUserByIdRepository.getById(id);

    if (!userExists) {
      throw new UserNotFoundException({ id });
    }

    const userToUpdate = new User({ ...userExists, ...paramsToUpdate });

    const userToUpdateDTO = UserTransformer.generateDTO(userToUpdate);

    const userUpdatedDTO = await this.updateUserRepository.update(
      userToUpdateDTO
    );

    const userUpdated = new User(userUpdatedDTO);

    return userUpdated;
  }
}
