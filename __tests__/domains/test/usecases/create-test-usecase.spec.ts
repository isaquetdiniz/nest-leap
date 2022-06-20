import { mockCreateTestResult } from '@/tests/domains/test/entities/mocks/test-mocks';
import { CreateTestUsecase, ICreateTestUsecase } from '@/domains/test';
import { SaveTestRepositorySpy, GetTestByNameRepositorySpy } from '@/tests/domains/test/usecases/repos';
import { UUIDGeneratorAdapter } from '@/shared/infra/uuid';
import { pinoLoggerLocal } from '@/shared/infra/logs';

type SutTypes = {
    sut: ICreateTestUsecase;
    saveTestRepositorySpy: SaveTestRepositorySpy;
};

const makeSut = (): SutTypes => {
  const saveTestRepositorySpy = new SaveTestRepositorySpy();
  const getTestByNameRepositorySpy = new GetTestByNameRepositorySpy();
  const uuidGenerator = new UUIDGeneratorAdapter();

  const sut = new CreateTestUsecase(
    getTestByNameRepositorySpy,
    uuidGenerator,
    saveTestRepositorySpy,
    pinoLoggerLocal,
  );

  return {
    sut,
    saveTestRepositorySpy,
  };
}

describe('Create Test Service', () => {
  it('should call CreateTestRepository with correct parameters', async () => {
    const { sut, saveTestRepositorySpy } = makeSut();
    const createTestSpy = jest.spyOn(saveTestRepositorySpy, 'save');

    const fakeTest = mockCreateTestResult();

    await sut.execute(fakeTest);

    expect(createTestSpy).toBeCalled();
    expect(createTestSpy).toHaveReturned();
  });

  it('should throw if CreateTestRepository throws', async () => {
    const { sut, saveTestRepositorySpy } = makeSut();
    jest.spyOn(saveTestRepositorySpy, 'save').mockImplementationOnce(() => {
      return Promise.reject(new Error());
    });

    const fakeTest = mockCreateTestResult();

    const response = sut.execute(fakeTest);

    expect(response).rejects.toThrow();
  });

  it('should return a new Test with success', async () => {
    const { sut } = makeSut();

    const fakeTest = mockCreateTestResult();

    const response = await sut.execute(fakeTest);

    expect(response).toHaveProperty('id');
    expect(response).toHaveProperty('name', fakeTest.name);
    expect(response).toHaveProperty('type', fakeTest.type);
  });
});
