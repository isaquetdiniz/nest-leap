import { PrismaCountTestsByFilterRepository } from '@/domains/test';
import { prismaConnector } from '@/shared/infra/prisma/index';

import { mockCreateTestParams } from '@/tests/domains/test/entities/mocks/test-mocks';
import { PrismaClient } from '@prisma/client';

const makeSut = () => {
  const sut = new PrismaCountTestsByFilterRepository();

  return {
    sut,
  };
}

describe('Prisma Save Test Repository', () => {
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

  it('should count tests by filter', async () => {
    const { sut } = makeSut();

    for (const name of ['ABCDE', 'abce', 'abcd']) {
      await prismaTest?.test.create({
        data: {
          ...mockCreateTestParams(),
          name,
        },
      });
    }

    const tests = await sut.count({
      name: 'abc',
    });
    expect(tests).toBe(3);

    const tests2 = await sut.count({
      name: 'abcd',
    });
    expect(tests2).toBe(2);
  });
});
