import { badRequest, ok, serverError } from '@/shared/interface/http/helpers';
import {
  HttpController,
  HttpResponse,
} from '@/shared/interface/http/protocols';
import { Validation } from '@/shared/interface/validation/protocols';
import {
  GetTesteRatinhosByFilterController,
  IGetTesteRatinhosByFilterRepository,
  ICountTesteRatinhosByFilterRepository,
  GetTesteRatinhosByFilterRequest,
} from '@/domains/teste-ratinho';
import { ValidationException } from '@/shared/helpers';

export type HttpGetTesteRatinhosByFilterRequest =
  GetTesteRatinhosByFilterRequest;

export class HttpGetTesteRatinhosByFilterController implements HttpController {
  private controller: GetTesteRatinhosByFilterController;

  constructor(
    getTesteRatinhosByFilterRepository: IGetTesteRatinhosByFilterRepository,
    countTesteRatinhosByFilterRepository: ICountTesteRatinhosByFilterRepository,
    validation: Validation
  ) {
    this.controller = new GetTesteRatinhosByFilterController(
      getTesteRatinhosByFilterRepository,
      countTesteRatinhosByFilterRepository,
      validation
    );
  }

  async handle(
    httpRequest: HttpGetTesteRatinhosByFilterRequest
  ): Promise<HttpResponse> {
    const { name, enabled, createdAt, updatedAt, property, mode, take, skip } =
      httpRequest;

    try {
      const testeRatinhos = await this.controller.execute({
        name,
        enabled,
        createdAt,
        updatedAt,
        property,
        mode,
        take,
        skip,
      });

      return ok(testeRatinhos);
    } catch (error) {
      if (error instanceof ValidationException) {
        return badRequest(error);
      }

      return serverError(error as Error);
    }
  }
}
