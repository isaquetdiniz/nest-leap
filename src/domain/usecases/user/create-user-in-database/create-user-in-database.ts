import { CreateUserInDatabaseUsecase } from './create-user-in-database-usecase';
import { SaveUserInDatabaseRepository } from './protocols';
import { UUIDGenerator } from '@/domain/usecases/protocols/uuid';
import { User } from '@/domain/entities/user';
import { ListUsersUsecase } from '@/domain/usecases/user';
import { CreateUserInDatabaseError } from './errors/create-user-in-database-error';

type CreateUserInjectables = {
  saveUserInDatabaseRepository: SaveUserInDatabaseRepository;
  listUsersUsecase: ListUsersUsecase;
  UUIDGenerator: UUIDGenerator;
};

class CreateUserInDatabase implements CreateUserInDatabaseUsecase {
  private readonly saveUserInDatabaseRepository: SaveUserInDatabaseRepository;
  private readonly listUsersUsecase: ListUsersUsecase;
  private readonly UUIDGenerator: UUIDGenerator;

  constructor({
    saveUserInDatabaseRepository,
    listUsersUsecase,
    UUIDGenerator,
  }: CreateUserInjectables) {
    this.saveUserInDatabaseRepository = saveUserInDatabaseRepository;
    this.listUsersUsecase = listUsersUsecase;
    this.UUIDGenerator = UUIDGenerator;
  }

  async create(
    userParams: CreateUserInDatabaseUsecase.Params
  ): Promise<CreateUserInDatabaseUsecase.Result> {
    const { userRequester, isAdmin, name, email } = userParams;

    const { totalUsers } = await this.listUsersUsecase.list({
      userRequester,
      email,
    });

    if (totalUsers !== 0) {
      throw new CreateUserInDatabaseError(
        'User with this email already exists'
      );
    }

    const id = this.UUIDGenerator.generate();

    const newUser = new User({ id, isAdmin, name, email });

    const newUserData = newUser.toJSON();

    await this.saveUserInDatabaseRepository.save(newUserData);

    return newUserData;
  }
}

export { CreateUserInDatabase };
