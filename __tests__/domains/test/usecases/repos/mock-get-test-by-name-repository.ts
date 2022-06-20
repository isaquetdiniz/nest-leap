import { IGetTestByNameRepository } from '@/domains/test';
import { mockCreateTestResult } from '@/tests/domains/test/entities/mocks/test-mocks';

export class GetTestByNameRepositorySpy implements IGetTestByNameRepository {
  result = mockCreateTestResult();

  get(name: string): Promise<IGetTestByNameRepository.Result> {
    if (name === 'test name') return Promise.resolve(null);
    return Promise.resolve(this.result);
  }
}
