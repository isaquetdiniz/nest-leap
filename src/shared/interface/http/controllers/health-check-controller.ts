import {
  HttpController,
  HttpResponse,
} from '@/shared/interface/http/protocols';

import { ok, serverError } from '@/shared/interface/http/helpers';

export class HealthCheckController implements HttpController {
  async handle(): Promise<HttpResponse> {
    try {
      return ok();
    } catch (error) {
      const catchedError = error as Error;

      return serverError(catchedError);
    }
  }
}
