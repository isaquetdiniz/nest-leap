import { User, UserInput } from '@/domain/entities/User'

export interface CreateUserUsecase {
    create(userParams: CreateUserUsecase.Params): Promise<CreateUserUsecase.Result>
}

export namespace CreateUserUsecase {
    export type Params = Omit<UserInput, 'id'>
    export type Result = User
}
