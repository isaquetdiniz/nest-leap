import { Controller, HttpResponse } from '@/presentation/http/protocols';

import { ok, serverError } from '@/presentation/http/helpers/http-helper';

export class HealthCheckController implements Controller {
  async handle(httpRequest: any): Promise<HttpResponse> {
    try {
      return ok();
    } catch (error) {
      const catchedError = error as Error;

      return serverError(catchedError);
    }
  }
}
