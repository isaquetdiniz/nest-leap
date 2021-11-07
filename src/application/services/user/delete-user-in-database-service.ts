import { ListUsersUsecase, DeleteUserUsecase } from '@/domain/usecases/user';
import { DeleteUserInDatabaseRepository } from '@/application/protocols/database/repositories/user';
import { DeleteUserInDatabaseServiceError } from '@/application/errors/services/user';

type DeleteUserInDatabaseServiceInjectables = {
  listUsersUsecase: ListUsersUsecase;
  deleteUserInDatabaseRepository: DeleteUserInDatabaseRepository;
};

class DeleteUserInDatabaseService implements DeleteUserUsecase {
  private readonly listUsersUsecase: ListUsersUsecase;
  private readonly deleteUserInDatabaseRepository: DeleteUserInDatabaseRepository;

  constructor({
    listUsersUsecase,
    deleteUserInDatabaseRepository,
  }: DeleteUserInDatabaseServiceInjectables) {
    this.deleteUserInDatabaseRepository = deleteUserInDatabaseRepository;
    this.listUsersUsecase = listUsersUsecase;
  }

  async delete(
    userParams: DeleteUserUsecase.Params
  ): Promise<DeleteUserUsecase.Result> {
    const { id } = userParams;

    const { users, totalUsers } = await this.listUsersUsecase.list({ id });

    if (totalUsers === 0) {
      throw new DeleteUserInDatabaseServiceError('User not found');
    }

    const [user] = users;

    await this.deleteUserInDatabaseRepository.deleteUser(user);
  }
}

export { DeleteUserInDatabaseService };
