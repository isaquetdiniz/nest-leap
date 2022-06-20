import { IDeleteTestByIdUsecase } from '@/domains/test';

export class DeleteTestByIdUsecaseSpy implements IDeleteTestByIdUsecase {
  result = null;

  execute(id: string): Promise<void> {
    return Promise.resolve();
  }
}
