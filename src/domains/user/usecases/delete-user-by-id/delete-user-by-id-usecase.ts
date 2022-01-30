import {
  IGetUserByIdRepository,
  IGetUserByEmailInCloudRepository,
  IDeleteUserByEmailInCloudRepository,
  IDeleteUserByIdRepository,
  UserNotFoundException,
} from '@/domains/user';

export interface IDeleteUserByIdUsecase {
  execute(
    id: IDeleteUserByIdUsecase.Params
  ): Promise<IDeleteUserByIdUsecase.Result>;
}

export namespace IDeleteUserByIdUsecase {
  export type Params = string;
  export type Result = void;
}

export class DeleteUserByIdUsecase implements IDeleteUserByIdUsecase {
  constructor(
    private readonly getUserByIdRepository: IGetUserByIdRepository,
    private readonly getUserByEmailInCloudRepository: IGetUserByEmailInCloudRepository,
    private readonly deleteUserByEmailInCloudRepository: IDeleteUserByEmailInCloudRepository,
    private readonly deleteUserByIdRepository: IDeleteUserByIdRepository
  ) {}

  async execute(
    id: IDeleteUserByIdUsecase.Params
  ): Promise<IDeleteUserByIdUsecase.Result> {
    const userExists = await this.getUserByIdRepository.getById(id);

    if (!userExists) {
      throw new UserNotFoundException({ id });
    }

    const { email } = userExists;

    const userExistsInCloud =
      await this.getUserByEmailInCloudRepository.getByEmail(email);

    if (!userExistsInCloud) {
      throw new UserNotFoundException({ email });
    }

    await this.deleteUserByEmailInCloudRepository.delete(email);

    await this.deleteUserByIdRepository.delete(id);
  }
}
