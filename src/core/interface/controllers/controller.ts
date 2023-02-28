import { ILoggerProvider } from '@/core/application';
import { IValidation } from '@/core/interface';

export abstract class Controller<Request = unknown, Response = unknown> {
  constructor(
    private readonly validation: IValidation<Request, Response>,
    private readonly logger: ILoggerProvider,
  ) {}

  logRequest(request: Request) {
    this.logger.debug({ message: 'Request received', request });
  }

  logResponse(response: Response) {
    this.logger.debug({ message: 'Response received', response });
  }

  validateRequest(request: Request) {
    this.validation.request(request);
  }

  validateResponse(response: Response) {
    this.validation.response(response);
  }

  abstract perform(request: Request): Promise<Response>;

  async execute(request: Request): Promise<Response> {
    this.logRequest(request);
    this.validateRequest(request);

    const response = await this.perform(request);

    this.validateResponse(response);

    return response;
  }
}
