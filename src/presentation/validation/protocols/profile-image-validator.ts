import { CreateUser } from '@/domain/usecases/user';

export interface ProfileImageValidator {
  validate(image: ProfileImageValidator.Params): ProfileImageValidator.Result;
}

export namespace ProfileImageValidator {
  export type Params = CreateUser.Params['profileImage'];
  export type Result = boolean;
}
