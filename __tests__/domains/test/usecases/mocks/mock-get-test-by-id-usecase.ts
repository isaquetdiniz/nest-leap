import { IGetTestbyIdUsecase } from '@/domains/test';
import { mockCreateTestResult } from '../../entities/mocks/test-mocks';

export class GetTestByIdUsecaseSpy implements IGetTestbyIdUsecase {
  result: IGetTestbyIdUsecase.Result = mockCreateTestResult();

  execute(id: string): Promise<IGetTestbyIdUsecase.Result> {
    return Promise.resolve(this.result);
  }
}
