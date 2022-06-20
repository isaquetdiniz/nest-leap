import { Test, ICreateTestUsecase } from '@/domains/test';
import { mockCreateTestResult } from '@/tests/domains/test/entities/mocks/test-mocks';

export class CreateTestUsecaseSpy implements ICreateTestUsecase {
  result = mockCreateTestResult();

  execute(params: ICreateTestUsecase.Params): Promise<Test> {
    return Promise.resolve(this.result);
  }
}
