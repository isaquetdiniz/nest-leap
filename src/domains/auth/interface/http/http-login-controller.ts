import {
  HttpController,
  HttpResponse,
} from '@/shared/interface/http/protocols';
import { Validation } from '@/shared/interface/validation/protocols';
import { badRequest, ok, serverError } from '@/shared/interface/http/helpers';
import { ValidationException } from '@/shared/helpers';

import {
  AuthUserNeedSetPasswordException,
  AuthUserNotFoundException,
  AuthUserNotMadeFirstLoginException,
  IGetAuthUserByEmailInCloudRepository,
  IGetAuthUserByEmailRepository,
  ILoginInCloudGateway,
  LoginController,
} from '@/domains/auth';

export interface HttpLoginRequest {
  email: string;
  password: string;
}

export class HttpLoginController implements HttpController {
  private controller: LoginController;

  constructor(
    getAuthUserByEmailRepository: IGetAuthUserByEmailRepository,
    getAuthUserByEmailInCloudRepository: IGetAuthUserByEmailInCloudRepository,
    loginInCloudGateway: ILoginInCloudGateway,
    validation: Validation
  ) {
    this.controller = new LoginController(
      getAuthUserByEmailRepository,
      getAuthUserByEmailInCloudRepository,
      loginInCloudGateway,
      validation
    );
  }

  async handle(httpRequest: HttpLoginRequest): Promise<HttpResponse> {
    const { email, password } = httpRequest;

    try {
      const { access, authUser } = await this.controller.execute({
        email,
        password,
      });

      return ok({ access, authUser });
    } catch (error) {
      if (
        error instanceof ValidationException ||
        error instanceof AuthUserNotFoundException ||
        error instanceof AuthUserNotMadeFirstLoginException ||
        error instanceof AuthUserNeedSetPasswordException
      ) {
        return badRequest(error);
      }

      return serverError(error as Error);
    }
  }
}
