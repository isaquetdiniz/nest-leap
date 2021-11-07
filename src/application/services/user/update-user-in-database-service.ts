import { ListUsersUsecase, UpdateUserUsecase } from '@/domain/usecases/user';
import { UpdateUserInDatabaseRepository } from '@/application/protocols/database/repositories/user';
import { UpdateUserInDatabaseServiceError } from '@/application/errors/services/user';

type UpdateUserInDatabaseServiceInjectables = {
  listUsersUsecase: ListUsersUsecase;
  updateUserInDatabaseRepository: UpdateUserInDatabaseRepository;
};

class UpdateUserInDatabaseService implements UpdateUserUsecase {
  private readonly listUsersUsecase: ListUsersUsecase;
  private readonly updateUserInDatabaseRepository: UpdateUserInDatabaseRepository;

  constructor({
    listUsersUsecase,
    updateUserInDatabaseRepository,
  }: UpdateUserInDatabaseServiceInjectables) {
    this.updateUserInDatabaseRepository = updateUserInDatabaseRepository;
    this.listUsersUsecase = listUsersUsecase;
  }

  async update(
    userParams: UpdateUserUsecase.Params
  ): Promise<UpdateUserUsecase.Result> {
    const { id, userRequester, ...paramsToUpdateUser } = userParams;

    const { users, totalUsers } = await this.listUsersUsecase.list({
      userRequester,
      id,
    });

    if (totalUsers === 0) {
      throw new UpdateUserInDatabaseServiceError('User not found');
    }

    const [user] = users;

    const userRequesterCanUpdateThisUser =
      userRequester.canUpdateThisUser(user);

    if (!userRequesterCanUpdateThisUser) {
      throw new UpdateUserInDatabaseServiceError(
        'User requester do not have permissions to update this user'
      );
    }

    const userUpdated = user.updateParams(paramsToUpdateUser);

    await this.updateUserInDatabaseRepository.updateUser(userUpdated);

    return userUpdated;
  }
}

export { UpdateUserInDatabaseService };
