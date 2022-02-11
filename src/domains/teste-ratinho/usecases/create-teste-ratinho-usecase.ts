import {
  TesteRatinho,
  TesteRatinhoTransformer,
  IGetTesteRatinhoByNameRepository,
  ISaveTesteRatinhoRepository,
  TesteRatinhoAlreadyExistsException,
} from '@/domains/teste-ratinho';

import { IUuidGenerator } from '@/shared/protocols/uuid-generator';

export interface ICreateTesteRatinhoUsecase {
  execute(
    params: ICreateTesteRatinhoUsecase.Params
  ): Promise<ICreateTesteRatinhoUsecase.Response>;
}

export namespace ICreateTesteRatinhoUsecase {
  export type Params = {
    name: string;
  };

  export type Response = TesteRatinho;
}

export class CreateTesteRatinhoUsecase implements ICreateTesteRatinhoUsecase {
  constructor(
    private readonly getTesteRatinhoByNameRepository: IGetTesteRatinhoByNameRepository,
    private readonly uuidGenerator: IUuidGenerator,
    private readonly saveTesteRatinhoRepository: ISaveTesteRatinhoRepository
  ) {}

  async execute(
    params: ICreateTesteRatinhoUsecase.Params
  ): Promise<ICreateTesteRatinhoUsecase.Response> {
    const { name } = params;

    const testeRatinhoExists = await this.getTesteRatinhoByNameRepository.get(
      name
    );

    if (testeRatinhoExists) {
      throw new TesteRatinhoAlreadyExistsException({ name });
    }

    const id = this.uuidGenerator.generate();

    const testeRatinho = new TesteRatinho({ id, name });

    const testeRatinhoDTO = TesteRatinhoTransformer.generateDTO(testeRatinho);

    const testeRatinhoCreatedDTO = await this.saveTesteRatinhoRepository.save(
      testeRatinhoDTO
    );

    const testeRatinhoCreated = new TesteRatinho(testeRatinhoCreatedDTO);

    return testeRatinhoCreated;
  }
}
