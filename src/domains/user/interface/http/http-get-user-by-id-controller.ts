import { badRequest, ok, serverError } from '@/shared/interface/http/helpers';
import {
  HttpController,
  HttpResponse,
} from '@/shared/interface/http/protocols';
import { Validation } from '@/shared/interface/validation/protocols';
import {
  GetUserByIdController,
  IGetUserByEmailInCloudRepository,
  IGetUserByIdRepository,
} from '@/domains/user';
import { ValidationException } from '@/shared/helpers';
import { ILoggerLocal } from '@/shared/protocols';

export interface HttpGetUserByIdRequest {
  id: string;
}

export class HttpGetUserByIdController implements HttpController {
  private controller: GetUserByIdController;
  private logger: ILoggerLocal;

  constructor(
    getUserByIdRepository: IGetUserByIdRepository,
    getUserByEmailInCloudRepository: IGetUserByEmailInCloudRepository,
    validation: Validation,
    logger: ILoggerLocal
  ) {
    this.controller = new GetUserByIdController(
      getUserByIdRepository,
      getUserByEmailInCloudRepository,
      validation,
      logger
    );

    this.logger = logger.child({ httpController: 'get-user-by-id' });
  }

  async handle(httpRequest: HttpGetUserByIdRequest): Promise<HttpResponse> {
    this.logger.logDebug({ message: 'Request Received', data: httpRequest });

    const { id } = httpRequest;

    try {
      const user = await this.controller.execute({ id });

      this.logger.logDebug({ message: 'User found', data: user });

      return ok(user);
    } catch (error) {
      if (error instanceof ValidationException) {
        return badRequest(error);
      }

      return serverError(error as Error);
    }
  }
}
