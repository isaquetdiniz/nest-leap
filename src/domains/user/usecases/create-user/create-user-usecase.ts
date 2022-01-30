import {
  User,
  UserTransformer,
  IGetUserByEmailRepository,
  IGetUserByEmailInCloudRepository,
  ISaveUserRepository,
  ISaveUserInCloudRepository,
  IDeleteUserByIdRepository,
  UserAlreadyExistsException,
} from '@/domains/user';

import { IUuidGenerator } from '@/shared/protocols/uuid-generator';

export interface ICreateUserUsecase {
  execute(
    params: ICreateUserUsecase.Params
  ): Promise<ICreateUserUsecase.Response>;
}

export namespace ICreateUserUsecase {
  export type Params = {
    name: string;
    email: string;
    isAdmin: boolean;
  };

  export type Response = User;
}

export class CreateUserUsecase implements ICreateUserUsecase {
  constructor(
    private readonly getUserByEmailRepository: IGetUserByEmailRepository,
    private readonly getUserByEmailInCloudRepository: IGetUserByEmailInCloudRepository,
    private readonly uuidGenerator: IUuidGenerator,
    private readonly saveUserRepository: ISaveUserRepository,
    private readonly saveUserInCloudRepository: ISaveUserInCloudRepository,
    private readonly deleteUserByIdRepository: IDeleteUserByIdRepository
  ) {}

  async execute(
    params: ICreateUserUsecase.Params
  ): Promise<ICreateUserUsecase.Response> {
    const { name, email, isAdmin } = params;

    const userExists = await this.getUserByEmailRepository.getByEmail(email);

    if (userExists) {
      throw new UserAlreadyExistsException({ name, email, isAdmin });
    }

    const userExistsInCloud =
      await this.getUserByEmailInCloudRepository.getByEmail(email);

    if (userExistsInCloud) {
      throw new UserAlreadyExistsException({ name, email, isAdmin });
    }

    const id = this.uuidGenerator.generate();

    const user = new User({ id, name, email, isAdmin });

    const userDTO = UserTransformer.generateDTO(user);

    const userCreatedDTO = await this.saveUserRepository.save(userDTO);

    try {
      await this.saveUserInCloudRepository.save({ email });
    } catch (error) {
      await this.deleteUserByIdRepository.delete(id);

      throw error;
    }

    const userCreated = new User(userCreatedDTO);

    return userCreated;
  }
}
