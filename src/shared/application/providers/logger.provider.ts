export interface ILoggerProvider {
  child(bindings: { [key: string]: string }): any;
  info(message: any): void;
  debug(message: any): void;
  error(message: any): void;
}
