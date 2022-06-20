import { GetTestByIdUsecase, IGetTestbyIdUsecase } from '@/domains/test';
import { GetTestByIdRepositorySpy } from '@/tests/domains/test/usecases/repos';
import { pinoLoggerLocal } from '@/shared/infra/logs';

type SutTypes = {
  sut: IGetTestbyIdUsecase;
  getTestByIdrepositorySpy: GetTestByIdRepositorySpy;
};

const makeSut = (): SutTypes => {
  const getTestByIdrepositorySpy = new GetTestByIdRepositorySpy();

  const sut = new GetTestByIdUsecase(getTestByIdrepositorySpy, pinoLoggerLocal);

  return {
    sut,
    getTestByIdrepositorySpy,
  };
}

describe('Get Test by ID Service', () => {
  it('should call ListTestRepository with correc data', async () => {
    const { sut, getTestByIdrepositorySpy } = makeSut();
    const getTestReposytorySpy = jest.spyOn(getTestByIdrepositorySpy, 'get');

    await sut.execute('');

    expect(getTestReposytorySpy).toBeCalled();
    expect(getTestReposytorySpy).toHaveReturned();
  });

  it('should throw if ListTestRepository throws', async () => {
    const { sut, getTestByIdrepositorySpy } = makeSut();
    jest.spyOn(getTestByIdrepositorySpy, 'get').mockImplementationOnce(() => {
      return Promise.reject(new Error());
    });

    const response = sut.execute('');

    expect(response).rejects.toThrow();
  })

  it('should return a test if id is provided', async () => {
    const { sut, getTestByIdrepositorySpy } = makeSut();

    const test = await sut.execute('a98a83d2-87f4-4a48-bfce-a80e27d7a7e2');

    expect(test).toBe(getTestByIdrepositorySpy.result);
  })

  it('should return null if ListTestRepository returns null', async () => {
    const { sut } = makeSut();

    const test = await sut.execute('');

    expect(test).toStrictEqual(null);
  });
});
