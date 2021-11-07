import { CreateUserUsecase, DeleteUserUsecase } from '@/domain/usecases/user';
import {
  CreateUserCloudUsecase,
  CreateUserInDatabaseUsecase,
} from '@/application/usecases/user';

type CreateUserInDatabaseAndCloudServiceInjectables = {
  createUserInDatabaseUsecase: CreateUserInDatabaseUsecase;
  createUserCloudUsecase: CreateUserCloudUsecase;
  deleteUserUsecase: DeleteUserUsecase;
};

class CreateUserInDatabaseAndCloudService implements CreateUserUsecase {
  private readonly createUserInDatabaseUsecase: CreateUserInDatabaseUsecase;
  private readonly createUserCloudUsecase: CreateUserCloudUsecase;
  private readonly deleteUserUsecase: DeleteUserUsecase;

  constructor({
    createUserInDatabaseUsecase,
    createUserCloudUsecase,
    deleteUserUsecase,
  }: CreateUserInDatabaseAndCloudServiceInjectables) {
    this.createUserInDatabaseUsecase = createUserInDatabaseUsecase;
    this.createUserCloudUsecase = createUserCloudUsecase;
    this.deleteUserUsecase = deleteUserUsecase;
  }

  async create(
    userParams: CreateUserUsecase.Params
  ): Promise<CreateUserUsecase.Result> {
    const { isAdmin, name, email } = userParams;

    const user = await this.createUserInDatabaseUsecase.create({
      isAdmin,
      name,
      email,
    });

    try {
      await this.createUserCloudUsecase.create({ email });
    } catch (error) {
      const userId = user.getId();

      await this.deleteUserUsecase.delete({ id: userId });

      throw error;
    }

    return user;
  }
}

export { CreateUserInDatabaseAndCloudService };
