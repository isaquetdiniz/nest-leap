import { Controller, HttpResponse } from '@/presentation/http/protocols';

import { LoggerError } from '@/application/protocols/utils';

export class LogControllerDecorator implements Controller {
  private readonly controller: Controller;
  private readonly loggerError: LoggerError;

  constructor(controller: Controller, loggerError: LoggerError) {
    this.controller = controller;
    this.loggerError = loggerError;
  }

  async handle(httRequest: any): Promise<HttpResponse> {
    const httpResponse = await this.controller.handle(httRequest);

    if (httpResponse.statusCode >= 500) {
      this.loggerError.log(httpResponse.body);
    }

    return httpResponse;
  }
}
