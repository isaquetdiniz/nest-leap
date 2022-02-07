import {
  HttpController,
  HttpResponse,
} from '@/shared/interface/http/protocols';
import { Validation } from '@/shared/interface/validation/protocols';
import { badRequest, ok, serverError } from '@/shared/interface/http/helpers';
import { ValidationException } from '@/shared/helpers';

import {
  AuthUserAlreadyMadeFirstLoginException,
  AuthUserNotFoundException,
  FirstLoginController,
  IFirstLoginInCloudGateway,
  IGetAuthUserByEmailInCloudGateway,
  IGetAuthUserByEmailRepository,
  ILoginInCloudGateway,
} from '@/domains/auth';

export interface HttpFirstLoginRequest {
  email: string;
  newPassword: string;
  temporaryPassword: string;
}

export class HttpFirstLoginController implements HttpController {
  private controller: FirstLoginController;

  constructor(
    getAuthUserByEmailRepository: IGetAuthUserByEmailRepository,
    getAuthUserByEmailInCloudGateway: IGetAuthUserByEmailInCloudGateway,
    firstLoginInCloudGateway: IFirstLoginInCloudGateway,
    loginInCloudGateway: ILoginInCloudGateway,
    validation: Validation
  ) {
    this.controller = new FirstLoginController(
      getAuthUserByEmailRepository,
      getAuthUserByEmailInCloudGateway,
      firstLoginInCloudGateway,
      loginInCloudGateway,
      validation
    );
  }

  async handle(httpRequest: HttpFirstLoginRequest): Promise<HttpResponse> {
    const { email, newPassword, temporaryPassword } = httpRequest;

    try {
      const { access, authUser } = await this.controller.execute({
        email,
        newPassword,
        temporaryPassword,
      });

      return ok({ access, authUser });
    } catch (error) {
      if (
        error instanceof ValidationException ||
        error instanceof AuthUserNotFoundException ||
        error instanceof AuthUserAlreadyMadeFirstLoginException
      ) {
        return badRequest(error);
      }

      return serverError(error as Error);
    }
  }
}
