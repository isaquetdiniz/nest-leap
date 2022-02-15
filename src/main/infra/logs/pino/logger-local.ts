export interface ILoggerLocal {
  child(bindings: { [key: string]: string }): any;
  logDebug(message: any): void;
  logDegub(message: any): void;
  logError(message: any): void;
}
