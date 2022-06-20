import { TestFilters, IGetTestsByFilterUsecase } from '@/domains/test';
import { mockCreateTestResult } from '../../entities/mocks/test-mocks';

export class GetTestsByFilterUsecaseSpy implements IGetTestsByFilterUsecase {
  result: IGetTestsByFilterUsecase.Result = {
    tests: [mockCreateTestResult()],
    totalTests: 1,
  };

  execute(listParams: TestFilters): Promise<IGetTestsByFilterUsecase.Result> {
    return Promise.resolve(this.result);
  }
}
