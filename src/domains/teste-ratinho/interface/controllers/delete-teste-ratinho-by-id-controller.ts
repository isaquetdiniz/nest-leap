import { Validation } from '@/shared/interface/validation/protocols';
import {
  IDeleteTesteRatinhoByIdRepository,
  IGetTesteRatinhoByIdRepository,
  DeleteTesteRatinhoByIdUsecase,
} from '@/domains/teste-ratinho';
import { ValidationException } from '@/shared/helpers';

export interface DeleteTesteRatinhoByIdRequest {
  id: string;
}

export type DeleteTesteRatinhoByIdResponse = void;

export class DeleteTesteRatinhoByIdController {
  private usecase: DeleteTesteRatinhoByIdUsecase;

  constructor(
    getTesteRatinhoByIdRepository: IGetTesteRatinhoByIdRepository,
    deleteTesteRatinhoByIdRepository: IDeleteTesteRatinhoByIdRepository,
    private readonly validation: Validation
  ) {
    this.usecase = new DeleteTesteRatinhoByIdUsecase(
      getTesteRatinhoByIdRepository,
      deleteTesteRatinhoByIdRepository
    );
  }

  async execute(
    request: DeleteTesteRatinhoByIdRequest
  ): Promise<DeleteTesteRatinhoByIdResponse> {
    const { id } = request;

    const hasError = this.validation.validate({ id });

    if (hasError) {
      throw new ValidationException(hasError);
    }

    await this.usecase.execute(id);
  }
}
