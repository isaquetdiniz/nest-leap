import { PrismaGetTestsByFilterRepository } from '@/domains/test';
import { Pagination } from '@/shared/helpers';
import { prismaConnector } from '@/shared/infra/prisma/index';

import { mockCreateTestParams, mockListTestParams } from '@/tests/domains/test/entities/mocks/test-mocks';
import { PrismaClient } from '@prisma/client';

const makeSut = () => {
  const sut = new PrismaGetTestsByFilterRepository();

  return {
    sut,
  };
}

describe('Prisma Get Tests by Filter Repository', () => {
  let prismaTest: PrismaClient | null = null;
  beforeEach(async () => {
    prismaTest = prismaConnector.connect(process.env.DATABASE_TEST_URL);

    await prismaTest.test.deleteMany({});
  });

  afterEach(async () => {
    if (prismaTest) {
      await prismaTest.test.deleteMany({});
      await prismaTest.$disconnect();
    }
  });

  it('should list tests', async () => {
    const { sut } = makeSut();

    await prismaTest?.test.create({ data: { ...mockCreateTestParams() } });
    await prismaTest?.test.create({ data: { ...mockCreateTestParams() } });
    await prismaTest?.test.create({ data: { ...mockCreateTestParams() } });

    const fakeParams = mockListTestParams();

    const tests = await sut.get(fakeParams);

    expect(tests).toHaveLength(3);
  });

  it('should return empty array if there no tests in database', async () => {
    const { sut } = makeSut();

    const fakeParams = mockListTestParams();

    const tests = await sut.get(fakeParams);

    expect(tests).toHaveLength(0);
  });

  it('should filter tests like a elastic search', async () => {
    const { sut } = makeSut();

    for (const name of ['ABCDE', 'abce', 'abcd']) {
      await prismaTest?.test.create({
        data: {
          ...mockCreateTestParams(),
          name,
        },
      });
    }

    const testsInDataBase = await prismaTest?.test.count({});
    expect(testsInDataBase).toBe(3);

    const fakeParams = mockListTestParams();

    const tests = await sut.get({
      ...fakeParams,
      filters: { name: 'abc' },
    });
    expect(tests).toHaveLength(3);

    const tests2 = await sut.get({
      ...fakeParams,
      filters: { name: 'abcd' },
    });
    expect(tests2).toHaveLength(2);
  });

  it('should paginate tests', async () => {
    const { sut } = makeSut();

    for (let i: number = 0; i < 10; i += 1) {
      const test = mockCreateTestParams();
      await prismaTest?.test.create({
        data: {
          ...test,
          name: `test-${i}`,
        },
      });
    }

    const testsInDataBase = await prismaTest?.test.count();
    expect(testsInDataBase).toBe(10);

    const fakeParams = mockListTestParams();

    const tests = await sut.get(fakeParams);
    expect(tests).toHaveLength(10);

    const tests2 = await sut.get({
      ...fakeParams,
      pagination: new Pagination({ take: 5, skip: 5 }),
    });
    expect(tests2).toHaveLength(5);

    const tests3 = await sut.get({
      ...fakeParams,
      pagination: new Pagination({ take: 1, skip: 10 }),
    });
    expect(tests3).toHaveLength(0);

    const tests4 = await sut.get({
      ...fakeParams,
      pagination: new Pagination({ take: 0, skip: 10 }),
    });
    expect(tests4).toHaveLength(0);

    const tests5 = await sut.get({
      ...fakeParams,
      pagination: new Pagination({ take: 10, skip: 0 }),
    });
    expect(tests5).toHaveLength(10);

    const tests6 = await sut.get({
      ...fakeParams,
      pagination: new Pagination({ take: 10, skip: 8 }),
    });
    expect(tests6).toHaveLength(2);
  });
});
