import { IUsecase } from '@/core/application';
import { IUserRepository, UserNotFoundException } from '@/users/application';

export class DeleteUserByIdUsecase implements IUsecase<string, void> {
  constructor(private readonly userRepository: IUserRepository) {}

  async perform(id: string): Promise<void> {
    const userExists = await this.userRepository.getById(id);

    if (!userExists) {
      throw new UserNotFoundException({ id });
    }

    await this.userRepository.deleteById(id);
  }
}
