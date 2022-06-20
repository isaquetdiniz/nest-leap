import { IGetTestByIdRepository } from '@/domains/test';
import { mockCreateTestResult } from '@/tests/domains/test/entities/mocks/test-mocks';

export class GetTestByIdRepositorySpy implements IGetTestByIdRepository {
  result = mockCreateTestResult();

  get(id: string): Promise<IGetTestByIdRepository.Result> {
    if (id === '') return Promise.resolve(null);
    return Promise.resolve(this.result);
  }
}
