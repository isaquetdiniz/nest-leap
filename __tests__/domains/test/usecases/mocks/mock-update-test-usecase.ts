import { Test, IUpdateTestByIdUsecase } from '@/domains/test';
import { mockCreateTestResult } from '../../entities/mocks/test-mocks';

export class UpdateTestByIdUsecaseSpy implements IUpdateTestByIdUsecase {
  result = mockCreateTestResult();

  execute(updateParams: IUpdateTestByIdUsecase.Params): Promise<Test> {
    return Promise.resolve(this.result);
  }
}
