import { IDeleteTestByIdRepository } from '@/domains/test';

export class DeleteTestByIdRepositorySpy implements IDeleteTestByIdRepository {
  result = undefined;

  delete(id: string): Promise<void> {
    return Promise.resolve();
  }
}
