export interface StringLengthValidator {
  validate(str: StringLengthValidator.Params): StringLengthValidator.Result;
}

export namespace StringLengthValidator {
  export type Params = string;
  export type Result = boolean;
}
