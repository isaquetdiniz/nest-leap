import { Test, Test, ISaveTestRepository } from '@/domains/test';
import { mockCreateTestResult } from '@/tests/domains/test/entities/mocks/test-mocks';

export const mockCreateTestRepositoryParams =
  (): ISaveTestRepository.Params => mockCreateTestResult();

export class SaveTestRepositorySpy implements ISaveTestRepository {
  test = mockCreateTestResult();

  save(testParams: Test): Promise<Test> {
    return Promise.resolve(this.test);
  }
}
