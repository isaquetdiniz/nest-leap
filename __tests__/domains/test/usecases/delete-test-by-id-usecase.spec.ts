import { mockDeleteTestByIdParams } from '@/tests/domains/test/entities/mocks/test-mocks';
import { DeleteTestByIdUsecase, IDeleteTestByIdUsecase } from '@/domains/test';
import { DeleteTestByIdRepositorySpy, GetTestByIdRepositorySpy } from '@/tests/domains/test/usecases/repos';
import { pinoLoggerLocal } from '@/shared/infra/logs';

type SutTypes = {
  sut: IDeleteTestByIdUsecase;
  deleteTestRepositoryStub: DeleteTestByIdRepositorySpy;
};

const makeSut = (): SutTypes => {
  const getTestRepositoryStub = new GetTestByIdRepositorySpy();
  const deleteTestRepositoryStub = new DeleteTestByIdRepositorySpy();
  const sut = new DeleteTestByIdUsecase(
    getTestRepositoryStub,
    deleteTestRepositoryStub,
    pinoLoggerLocal,
  );

  return {
    sut,
    deleteTestRepositoryStub,
  };
}

describe('Delete Test Service', () => {
  it('should call DeleteTestRepository with correc data', async () => {
    const { sut, deleteTestRepositoryStub } = makeSut();
    const deleteTestSpy = jest.spyOn(deleteTestRepositoryStub, 'delete');

    const fakeTest = mockDeleteTestByIdParams();

    await sut.execute(fakeTest);

    expect(deleteTestSpy).toHaveBeenCalledWith(fakeTest);
  });

  it('should throw if DeleteTestRepository throws', async () => {
    const { sut, deleteTestRepositoryStub } = makeSut();
    jest.spyOn(deleteTestRepositoryStub, 'delete').mockImplementationOnce(() => {
      return Promise.reject(new Error());
    });

    const fakeTest = mockDeleteTestByIdParams();

    const response = sut.execute(fakeTest);

    expect(response).rejects.toThrow();
  });

  it('should return null on success', async () => {
    const { sut, deleteTestRepositoryStub } = makeSut();

    const fakeTest = mockDeleteTestByIdParams();

    const response = await sut.execute(fakeTest);

    expect(response).toBe(deleteTestRepositoryStub.result);
  });
});
