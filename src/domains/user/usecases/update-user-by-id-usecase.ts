import {
  User,
  IGetUserByIdRepository,
  IUpdateUserRepository,
  UserNotFoundException,
  UserTransformer,
} from '@/domains/user';
import { ILoggerLocal } from '@/shared/protocols';

export interface IUpdateUserByIdUsecase {
  execute(
    updateParams: IUpdateUserByIdUsecase.Params
  ): Promise<IUpdateUserByIdUsecase.Result>;
}

export namespace IUpdateUserByIdUsecase {
  export type Params = {
    id: string;
    paramsToUpdate: {
      name?: string;
      isAdmin?: boolean;
      enabled?: boolean;
    };
  };
  export type Result = User;
}

export class UpdateUserByIdUsecase implements IUpdateUserByIdUsecase {
  private logger: ILoggerLocal;

  constructor(
    private readonly getUserByIdRepository: IGetUserByIdRepository,
    private readonly updateUserRepository: IUpdateUserRepository,
    logger: ILoggerLocal
  ) {
    this.logger = logger.child({ usecase: 'update-user-by-id' });
  }

  async execute(
    updateParams: IUpdateUserByIdUsecase.Params
  ): Promise<IUpdateUserByIdUsecase.Result> {
    this.logger.logDebug({ message: 'Request received', data: updateParams });

    const { id, paramsToUpdate } = updateParams;

    const userExists = await this.getUserByIdRepository.getById(id);

    if (!userExists) {
      throw new UserNotFoundException({ id });
    }

    this.logger.logDebug({ message: 'User found', data: userExists });

    const userToUpdate = new User({ ...userExists, ...paramsToUpdate });

    const userToUpdateDTO = UserTransformer.generateDTO(userToUpdate);

    const userUpdatedDTO = await this.updateUserRepository.update(
      userToUpdateDTO
    );

    const userUpdated = new User(userUpdatedDTO);

    this.logger.logDebug({ message: 'User updated', data: userUpdated });

    return userUpdated;
  }
}
