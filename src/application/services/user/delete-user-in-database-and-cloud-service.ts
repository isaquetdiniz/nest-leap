import { ListUsersUsecase, DeleteUserUsecase } from '@/domain/usecases/user';
import { DeleteUserInDatabaseRepository } from '@/application/protocols/database/repositories/user';
import { DeleteUserInDatabaseServiceError } from '@/application/errors/services/user';
import { DeleteUserFromCloudProvider } from '@/application/protocols/cloud/user';

type DeleteUserInDatabaseAndCloudServiceInjectables = {
  listUsersUsecase: ListUsersUsecase;
  deleteUserInDatabaseRepository: DeleteUserInDatabaseRepository;
  deleteUserFromCloudProvider: DeleteUserFromCloudProvider;
};

class DeleteUserInDatabaseAndCloudService implements DeleteUserUsecase {
  private readonly listUsersUsecase: ListUsersUsecase;
  private readonly deleteUserInDatabaseRepository: DeleteUserInDatabaseRepository;
  private readonly deleteUserFromCloudProvider: DeleteUserFromCloudProvider;

  constructor({
    listUsersUsecase,
    deleteUserInDatabaseRepository,
    deleteUserFromCloudProvider,
  }: DeleteUserInDatabaseAndCloudServiceInjectables) {
    this.deleteUserInDatabaseRepository = deleteUserInDatabaseRepository;
    this.listUsersUsecase = listUsersUsecase;
    this.deleteUserFromCloudProvider = deleteUserFromCloudProvider;
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

    const email = user.getEmail();

    await this.deleteUserInDatabaseRepository.deleteUser(user);

    await this.deleteUserFromCloudProvider.deleteUser({ email });
  }
}

export { DeleteUserInDatabaseAndCloudService };
