import { Controller, HttpResponse } from '@/presentation/http/protocols';

// import { LogErrorRepository } from '@/data/protocols/repositories/log-error'

export class LogControllerDecorator implements Controller {
  private readonly controller: Controller;
  // private readonly logErrorRepository: LogErrorRepository

  constructor(controller: Controller) {
    this.controller = controller;
    // this.logErrorRepository = logErrorRepository
  }

  async handle(httRequest: any): Promise<HttpResponse> {
    const httpResponse = await this.controller.handle(httRequest);
    /*
      if (httpResponse.statusCode === 500) {
        await this.logErrorRepository.log(httpResponse.body.stack)
      }
      */
    return httpResponse;
  }
}
