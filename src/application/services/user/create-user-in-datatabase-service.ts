import { CreateUserUsecase, ListUsersUsecase } from '@/domain/usecases/user';
import { CreateUserInDatabaseRepository } from '@/application/protocols/database/repositories/user';
import { UUIDGenerator } from '@/application/protocols/uuid';
import { User } from '@/domain/entities';
import { CreateUserInDatabaseUsecase } from '@/application/usecases/user';
import { CreateUserInDatabaseServiceError } from '@/application/errors/services/user';

type CreateUserInDatabaseServiceInjectables = {
  createUserInDatabaseRepository: CreateUserInDatabaseRepository;
  listUsersUsecase: ListUsersUsecase;
  UUIDGenerator: UUIDGenerator;
};

class CreateUserInDatabaseService implements CreateUserInDatabaseUsecase {
  private readonly createUserInDatabaseRepository: CreateUserInDatabaseRepository;
  private readonly listUsersUsecase: ListUsersUsecase;
  private readonly UUIDGenerator: UUIDGenerator;

  constructor({
    createUserInDatabaseRepository,
    listUsersUsecase,
    UUIDGenerator,
  }: CreateUserInDatabaseServiceInjectables) {
    this.createUserInDatabaseRepository = createUserInDatabaseRepository;
    this.listUsersUsecase = listUsersUsecase;
    this.UUIDGenerator = UUIDGenerator;
  }

  async create(
    userParams: CreateUserUsecase.Params
  ): Promise<CreateUserUsecase.Result> {
    const { userRequester, isAdmin, name, email } = userParams;

    const id = await this.UUIDGenerator.generate();

    const { totalUsers } = await this.listUsersUsecase.list({
      userRequester,
      email,
    });

    if (totalUsers !== 0) {
      throw new CreateUserInDatabaseServiceError(
        'User with this email already exists'
      );
    }

    const newUser = new User({ id, isAdmin, name, email });

    await this.createUserInDatabaseRepository.createUser(newUser);

    return newUser;
  }
}

export { CreateUserInDatabaseService };
