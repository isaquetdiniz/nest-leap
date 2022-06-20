import { UpdateTestByIdUsecase } from '@/domains/test';
import {
  GetTestByIdRepositorySpy,
  UpdateTestRepositorySpy,
} from '@/tests/domains/test/usecases/repos';
import { pinoLoggerLocal } from '@/shared/infra/logs';
import { mockCreateTestResult } from '@/tests/domains/test/entities/mocks/test-mocks';

type SutTypes = {
  sut: UpdateTestByIdUsecase;
  getTestByIdRepositorySpy: GetTestByIdRepositorySpy;
  updateTestRepositorySpy: UpdateTestRepositorySpy;
};

const makeSut = (): SutTypes => {
  const updateTestRepositorySpy = new UpdateTestRepositorySpy();
  const getTestRepositorySpy = new GetTestByIdRepositorySpy();

  const sut = new UpdateTestByIdUsecase(
    getTestRepositorySpy,
    updateTestRepositorySpy,
    pinoLoggerLocal,
  );

  return {
    sut,
    getTestByIdRepositorySpy: getTestRepositorySpy,
    updateTestRepositorySpy,
  };
};

describe('Update Test Service', () => {
  it('should call UpdateTestRepositorySpy with correct data', async () => {
    const { sut, updateTestRepositorySpy } = makeSut();

    const updateTestSpy = jest.spyOn(updateTestRepositorySpy, 'update');

    const fakeParams = mockCreateTestResult();

    const { id, ...paramsToUpdate } = fakeParams;

    await sut.execute({
      id: id || '',
      paramsToUpdate,
    });

    expect(updateTestSpy).toBeCalled();
    expect(updateTestSpy).toHaveReturned();
  });

  it('should throw if UpdateTestByIdRepository throws', async () => {
    const { sut, updateTestRepositorySpy } = makeSut()
    jest.spyOn(updateTestRepositorySpy, 'update').mockImplementationOnce(() => {
      return Promise.reject(new Error())
    })

    const fakeParams = mockCreateTestResult()
    const { id, ...paramsToUpdate } = fakeParams;

    const response = sut.execute({ id: id || '', paramsToUpdate });

    expect(response).rejects.toThrow();
  })

  it('should return updated Test on success', async () => {
    const { sut, updateTestRepositorySpy } = makeSut();

    const fakeParams = mockCreateTestResult();
    const { id, ...paramsToUpdate } = fakeParams;

    const response = await sut.execute({
      id: id || '',
      paramsToUpdate,
    });

    expect(response).toBe(updateTestRepositorySpy.test);
  });
});
