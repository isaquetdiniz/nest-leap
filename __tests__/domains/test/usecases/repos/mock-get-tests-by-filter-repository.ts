import { TestFilters, IGetTestsByFilterRepository } from '@/domains/test';
import { mockCreateTestResult } from '@/tests/domains/test/entities/mocks/test-mocks';

export class GetTestsByFilterRepositorySpy implements IGetTestsByFilterRepository {
  result = [mockCreateTestResult(), mockCreateTestResult()];

  get(params: TestFilters): Promise<IGetTestsByFilterRepository.Result> {
    if (params.filters.name === 'c2b88915-eef8-4859-af82-50eee0ee35ea') return Promise.resolve([this.result[0]]);
    if (params.filters.name === 'test name') return Promise.resolve([]);
    return Promise.resolve(this.result);
  }
}
