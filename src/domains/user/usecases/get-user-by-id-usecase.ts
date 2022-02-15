import {
  User,
  IGetUserByIdRepository,
  IGetUserByEmailInCloudRepository,
  UserNotFoundException,
} from '@/domains/user';
import { ILoggerLocal } from '@/shared/protocols';

export interface IGetUserbyIdUsecase {
  execute(id: IGetUserbyIdUsecase.Params): Promise<IGetUserbyIdUsecase.Result>;
}

export namespace IGetUserbyIdUsecase {
  export type Params = string;
  export type Result = User | null;
}

export class GetUserByIdUsecase implements IGetUserbyIdUsecase {
  private logger: ILoggerLocal;

  constructor(
    private readonly getUserByIdRepository: IGetUserByIdRepository,
    private readonly getUserByEmailInCloudRepository: IGetUserByEmailInCloudRepository,
    logger: ILoggerLocal
  ) {
    this.logger = logger.child({ usecase: 'get-user-by-id' });
  }

  async execute(
    id: IGetUserbyIdUsecase.Params
  ): Promise<IGetUserbyIdUsecase.Result> {
    this.logger.logDebug({ message: 'Request Received', data: { id } });

    const userExists = await this.getUserByIdRepository.getById(id);

    if (!userExists) return null;

    this.logger.logDebug({
      message: 'User found in database',
      data: userExists,
    });

    const { email } = userExists;

    const userExistsInCloud =
      await this.getUserByEmailInCloudRepository.getByEmail(email);

    if (!userExistsInCloud) {
      throw new UserNotFoundException({ email });
    }

    this.logger.logDebug({
      message: 'User found in cloud',
      data: userExistsInCloud,
    });

    const userFounded = new User(userExists);

    this.logger.logDebug({
      message: 'User found',
      data: userFounded,
    });

    return userFounded;
  }
}
