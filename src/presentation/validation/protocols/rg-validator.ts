import { Requester } from '@/domain/entities';

export interface RgValidator {
  validate(rg: RgValidator.Params): RgValidator.Result;
}

export namespace RgValidator {
  export type Params = Requester['rg'];
  export type Result = boolean;
}
