import {
  User,
  IGetUserByIdRepository,
  IGetUserByEmailInCloudRepository,
  UserNotFoundException,
} from '@/domains/user';

export interface IGetUserbyIdUsecase {
  execute(id: IGetUserbyIdUsecase.Params): Promise<IGetUserbyIdUsecase.Result>;
}

export namespace IGetUserbyIdUsecase {
  export type Params = string;
  export type Result = User | null;
}

export class GetUserByIdUsecase implements IGetUserbyIdUsecase {
  constructor(
    private readonly getUserByIdRepository: IGetUserByIdRepository,
    private readonly getUserByEmailInCloudRepository: IGetUserByEmailInCloudRepository
  ) {}

  async execute(
    id: IGetUserbyIdUsecase.Params
  ): Promise<IGetUserbyIdUsecase.Result> {
    const userExists = await this.getUserByIdRepository.getById(id);

    if (!userExists) return null;

    const { email } = userExists;

    const userExistsInCloud =
      await this.getUserByEmailInCloudRepository.getByEmail(email);

    if (!userExistsInCloud) {
      throw new UserNotFoundException({ email });
    }

    const userFounded = new User(userExists);

    return userFounded;
  }
}
