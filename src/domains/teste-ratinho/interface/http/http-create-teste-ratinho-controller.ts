import {
  CreateTesteRatinhoController,
  IGetTesteRatinhoByNameRepository,
  ISaveTesteRatinhoRepository,
  TesteRatinhoAlreadyExistsException,
} from '@/domains/teste-ratinho';
import {
  HttpController,
  HttpResponse,
} from '@/shared/interface/http/protocols';
import { Validation } from '@/shared/interface/validation/protocols';
import { badRequest, ok, serverError } from '@/shared/interface/http/helpers';
import { ValidationException } from '@/shared/helpers';
import { IUuidGenerator } from '@/shared/protocols';

export interface HttpCreateTesteRatinhoRequest {
  name: string;
}

export class HttpCreateTesteRatinhoController implements HttpController {
  private controller: CreateTesteRatinhoController;

  constructor(
    getTesteRatinhoByNameRepository: IGetTesteRatinhoByNameRepository,
    uuidGenerator: IUuidGenerator,
    saveTesteRatinhoRepository: ISaveTesteRatinhoRepository,
    validation: Validation
  ) {
    this.controller = new CreateTesteRatinhoController(
      getTesteRatinhoByNameRepository,
      uuidGenerator,
      saveTesteRatinhoRepository,
      validation
    );
  }

  async handle(
    httpRequest: HttpCreateTesteRatinhoRequest
  ): Promise<HttpResponse> {
    const { name } = httpRequest;

    try {
      const testeRatinhoCreated = await this.controller.execute({
        name,
      });

      return ok(testeRatinhoCreated);
    } catch (error) {
      if (error instanceof ValidationException) {
        return badRequest(error);
      }

      if (error instanceof TesteRatinhoAlreadyExistsException) {
        return badRequest(error);
      }

      return serverError(error as Error);
    }
  }
}
