import { CreateUserUsecase } from '@/domain/usecases/user';
import { CreateUserInDatabaseRepository } from '@/application/protocols/database/repositories/user';
import { UUIDGenerator } from '@/application/protocols/utils';
import { User } from '@/domain/entities';

type CreateUserInDatabaseServiceInjectables = {
  createUserInDatabaseRepository: CreateUserInDatabaseRepository;
  UUIDGenerator: UUIDGenerator;
};

class CreateUserInDatabaseService implements CreateUserUsecase {
  private readonly createUserInDatabaseRepository: CreateUserInDatabaseRepository;
  private readonly UUIDGenerator: UUIDGenerator;

  constructor({
    createUserInDatabaseRepository,
    UUIDGenerator,
  }: CreateUserInDatabaseServiceInjectables) {
    this.createUserInDatabaseRepository = createUserInDatabaseRepository;
    this.UUIDGenerator = UUIDGenerator;
  }

  async create(
    userParams: CreateUserUsecase.Params
  ): Promise<CreateUserUsecase.Result> {
    const { isAdmin, name, email, password } = userParams;

    const id = await this.UUIDGenerator.generate();

    const newUser = new User({ id, isAdmin, name, email, password });

    await this.createUserInDatabaseRepository.createUser(newUser);

    return newUser;
  }
}

export { CreateUserInDatabaseService };
