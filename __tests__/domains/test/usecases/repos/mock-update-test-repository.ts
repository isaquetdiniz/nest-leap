import { Test, Test, IUpdateTestRepository } from '@/domains/test';
import { mockCreateTestResult, mockUpdateTestParams } from '@/tests/domains/test/entities/mocks/test-mocks';

export const mockUpdateTestRepositoryParams =
  (): IUpdateTestRepository.Params => mockUpdateTestParams();

export class UpdateTestRepositorySpy implements IUpdateTestRepository {
  test = mockCreateTestResult();

  update(testToUpdate: Test): Promise<Test> {
    return Promise.resolve(this.test);
  }
}
