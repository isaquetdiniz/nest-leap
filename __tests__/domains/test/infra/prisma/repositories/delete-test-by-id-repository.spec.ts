import { PrismaDeleteTestByIdRepository } from '@/domains/test';
import { prismaConnector } from '@/shared/infra/prisma/index';

import { mockCreateTestParams } from '@/tests/domains/test/entities/mocks/test-mocks';
import { PrismaClient } from '@prisma/client';

const makeSut = () => {
  const sut = new PrismaDeleteTestByIdRepository();

  return {
    sut,
  };
}

describe('Prisma Save Test Repository', () => {
  let prismaTest: PrismaClient | null = null;
  beforeEach(async () => {
    prismaTest = prismaConnector.connect(process.env.DATABASE_TEST_URL);

    await prismaTest.test.deleteMany({});
  })

  afterEach(async () => {
    if (prismaTest) {
      await prismaTest.test.deleteMany({});
      await prismaTest.$disconnect();
    }
  });

  it('should delete a test by it\'s id', async () => {
    const { sut } = makeSut();

    const testCreated = await prismaTest?.test.create({
      data: mockCreateTestParams(),
    });

    await sut.delete(testCreated?.id || '');

    const testsInDataBase = await prismaTest?.test.count();

    expect(testsInDataBase).toBe(0);
  });
});
