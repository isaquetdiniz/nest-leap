import { ICountTestsByFilterRepository } from '@/domains/test';
import { mockCreateTestResult } from '@/tests/domains/test/entities/mocks/test-mocks';

export class CountTestsByFilterRepositorySpy implements ICountTestsByFilterRepository {
  test = mockCreateTestResult();

  count(filter: ICountTestsByFilterRepository.Params): Promise<number> {
    return Promise.resolve(5);
  }
}
