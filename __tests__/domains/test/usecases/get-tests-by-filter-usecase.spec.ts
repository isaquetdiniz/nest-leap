import { GetTestsByFilterUsecase } from '@/domains/test';
import {
  GetTestsByFilterRepositorySpy,
  CountTestsByFilterRepositorySpy,
} from '@/tests/domains/test/usecases/repos';
import { pinoLoggerLocal } from '@/shared/infra/logs';
import { mockListTestParams } from '@/tests/domains/test/entities/mocks/test-mocks';

type SutTypes = {
  sut: GetTestsByFilterUsecase;
  getTestsByFilterRepository: GetTestsByFilterRepositorySpy;
};

const makeSut = (): SutTypes => {
  const getTestsByFilterRepository = new GetTestsByFilterRepositorySpy();
  const countTestsByFilterRepository = new CountTestsByFilterRepositorySpy();

  const sut = new GetTestsByFilterUsecase(
    getTestsByFilterRepository,
    countTestsByFilterRepository,
    pinoLoggerLocal,
  );

  return {
    sut,
    getTestsByFilterRepository,
  };
}

describe('Get Test by filters Service', () => {
  it('should call ListTestRepository with correc data', async () => {
    const { sut, getTestsByFilterRepository } = makeSut();
    const getTestSpy = jest.spyOn(getTestsByFilterRepository, 'get');

    const fakeTest = mockListTestParams();

    await sut.execute(fakeTest);

    expect(getTestSpy).toHaveBeenCalledWith(fakeTest);
  });

  it('should throw if ListTestRepository throws', async () => {
    const { sut, getTestsByFilterRepository } = makeSut();

    jest.spyOn(getTestsByFilterRepository, 'get').mockImplementationOnce(() => {
      return Promise.reject(new Error());
    });

    const fakeTest = mockListTestParams();

    const response = sut.execute(fakeTest);

    expect(response).rejects.toThrow();
  });

  it('should return tests if nothing is passed', async () => {
    const { sut, getTestsByFilterRepository } = makeSut()

    const fakeTest = mockListTestParams();

    const { tests } = await sut.execute(fakeTest);

    expect(tests).toEqual([
      getTestsByFilterRepository.result[0],
      getTestsByFilterRepository.result[1],
    ]);
  });

  it('should return a empty array if ListTestRepository returns []', async () => {
    const { sut, getTestsByFilterRepository } = makeSut();
    getTestsByFilterRepository.result = [];

    const fakeTest = mockListTestParams();

    const { tests } = await sut.execute({
      ...fakeTest,
      filters: { name: 'Must pass' },
    });

    expect(tests).toStrictEqual([]);
  });
});
