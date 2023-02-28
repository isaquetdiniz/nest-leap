import {
  IsBoolean,
  IsDate,
  IsEmail,
  IsEnum,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';
import { UserState } from '@/users/domain';
import { ICreateUserRequest, ICreateUserResponse } from '@/users/interface';
import { IValidation } from '@/core/interface';
import { ClassValidator } from '@/libs/class_validator';

export class CreateUserValidation
  implements IValidation<ICreateUserRequest, ICreateUserResponse>
{
  request(params: ICreateUserRequest): void {
    class CreateUserPayload {
      @IsString()
      @MaxLength(150)
      @MinLength(2)
      name: string;

      @IsEmail()
      email: string;

      constructor(props: ICreateUserRequest) {
        Object.assign(this, props);
      }
    }

    ClassValidator.validate(new CreateUserPayload(params));
  }

  response(params: ICreateUserResponse): void {
    class CreateUserResponse {
      @IsUUID(4)
      id: string;

      @IsEnum(UserState)
      state: UserState;

      @IsBoolean()
      enabled: boolean;

      @IsString()
      @MaxLength(150)
      @MinLength(2)
      name: string;

      @IsEmail()
      email: string;

      @IsDate()
      createdAt: Date;

      @IsDate()
      updatedAt: Date;

      constructor(props: ICreateUserResponse) {
        Object.assign(this, props);
      }
    }

    ClassValidator.validate(new CreateUserResponse(params));
  }
}
