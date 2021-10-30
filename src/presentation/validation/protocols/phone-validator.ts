import { Requester } from '@/domain/entities';

export interface PhoneValidator {
  validate(phone: PhoneValidator.Params): PhoneValidator.Result;
}

export namespace PhoneValidator {
  export type Params = Requester['phone'];
  export type Result = boolean;
}
