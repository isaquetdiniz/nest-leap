export interface IValidation<Request = unknown, Response = unknown> {
  request(params: Request): void;
  response(params: Response): void;
}
