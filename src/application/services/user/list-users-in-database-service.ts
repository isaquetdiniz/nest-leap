import { ListUsersUsecase } from '@/domain/usecases/user';
import { ListUsersInDatabaseRepository } from '@/application/protocols/database/repositories/user';
import { User } from '@/domain/entities';

type ListeUserInDatabaseServiceInjectables = {
  listUsersInDatabaseRepository: ListUsersInDatabaseRepository;
};

class ListUserInDatabaseService implements ListUsersUsecase {
  private readonly listUsersInDatabaseRepository: ListUsersInDatabaseRepository;

  constructor({
    listUsersInDatabaseRepository,
  }: ListeUserInDatabaseServiceInjectables) {
    this.listUsersInDatabaseRepository = listUsersInDatabaseRepository;
  }

  async list(
    userFilters: ListUsersUsecase.Params
  ): Promise<ListUsersUsecase.Result> {
    const { userRequester, ...restUserFilters } = userFilters;

    const { users, totalUsers } =
      await this.listUsersInDatabaseRepository.listUser(restUserFilters);

    if (totalUsers === 0) {
      return { users: [], totalUsers: 0 };
    }

    const usersEntities = users.map((userInputs) => new User(userInputs));

    return { users: usersEntities, totalUsers };
  }
}

export { ListUserInDatabaseService };
