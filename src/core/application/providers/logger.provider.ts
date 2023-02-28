export interface ILoggerProvider {
  info(message: any): void;
  debug(message: any): void;
  error(message: any): void;
}
