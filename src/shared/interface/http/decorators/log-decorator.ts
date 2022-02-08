import {
  HttpController,
  HttpResponse,
} from '@/shared/interface/http/protocols';

import { ILoggerCloud, ILoggerLocal } from '@/shared/protocols';

export class LogControllerDecorator implements HttpController {
  private readonly controller: HttpController;
  private readonly loggerErrorCloud: ILoggerCloud;
  private readonly loggerLocal: ILoggerLocal;

  constructor(
    controller: HttpController,
    loggerErrorCloud: ILoggerCloud,
    loggerLocal: ILoggerLocal
  ) {
    this.controller = controller;
    this.loggerErrorCloud = loggerErrorCloud;
    this.loggerLocal = loggerLocal;
  }

  async handle(httRequest: any): Promise<HttpResponse> {
    const httpResponse = await this.controller.handle(httRequest);

    if (httpResponse.statusCode >= 500) {
      this.loggerErrorCloud.logError(httpResponse.body);
      this.loggerLocal.logError(httpResponse.body);
    }

    return httpResponse;
  }
}
