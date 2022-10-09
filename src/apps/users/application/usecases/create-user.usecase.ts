import { User } from '@/domains/user/entities';
import { UserAlreadyExistsException } from '@/domains/user/usecases/exceptions';
import {
  IGetUserByEmailRepository,
  IGetUserByEmailInCloudRepository,
  ISaveUserRepository,
  ISaveUserInCloudRepository,
  IDeleteUserByIdRepository,
} from '@/domains/user/usecases/repos';
import { ILoggerProvider, IUsecase } from '@/shared/application';

export class CreateUserUsecase
  implements IUsecase<{ name: string; email: string }, User>
{
  private logger: ILoggerProvider;

  constructor(
    private readonly getUserByEmailRepository: IGetUserByEmailRepository,
    private readonly getUserByEmailInCloudRepository: IGetUserByEmailInCloudRepository,
    private readonly saveUserRepository: ISaveUserRepository,
    private readonly saveUserInCloudRepository: ISaveUserInCloudRepository,
    private readonly deleteUserByIdRepository: IDeleteUserByIdRepository,
    logger: ILoggerProvider,
  ) {
    this.logger = logger.child({ usecase: 'create-user' });
  }

  async execute(
    params: ICreateUserUsecase.Params,
  ): Promise<ICreateUserUsecase.Response> {
    this.logger.logDebug({ message: 'Request received', data: params });

    const { name, email, isAdmin } = params;

    const userExists = await this.getUserByEmailRepository.getByEmail(email);

    if (userExists) {
      throw new UserAlreadyExistsException({ name, email, isAdmin });
    }

    const userExistsInCloud =
      await this.getUserByEmailInCloudRepository.getByEmail(email);

    if (userExistsInCloud) {
      throw new UserAlreadyExistsException({ name, email, isAdmin });
    }

    const id = this.uuidGenerator.generate();

    const user = new User({ id, name, email, isAdmin });

    const userCreated = await this.saveUserRepository.save({
      ...user,
    });

    this.logger.logDebug({
      message: 'User created in database',
      data: userCreated,
    });

    try {
      await this.saveUserInCloudRepository.save({ email });

      this.logger.logDebug({ message: 'User created in cloud' });
    } catch (error) {
      this.logger.logDebug({ message: 'User deleted', data: { id } });

      await this.deleteUserByIdRepository.delete(id);

      throw error;
    }

    this.logger.logDebug({ message: 'User created', data: userCreated });

    return userCreated;
  }
}
