import { PrismaUpdateTestRepository } from '@/domains/test';
import { prismaConnector } from '@/shared/infra/prisma/index';

import { mockCreateTestParams, mockUpdateTestParams } from '@/tests/domains/test/entities/mocks/test-mocks';
import { PrismaClient } from '@prisma/client';

const makeSut = () => {
  const sut = new PrismaUpdateTestRepository();

  return {
    sut,
  };
}

describe('Prisma Update Test Repository', () => {
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

  test('Should update a test', async () => {
    const { sut } = makeSut();

    const fakeTest = mockCreateTestParams();

    const testCreated = await prismaTest?.test.create({ data: fakeTest });

    const dataToBeUpdated = mockUpdateTestParams();
    dataToBeUpdated.id = testCreated?.id;

    const testUpdated = await sut.update(dataToBeUpdated);

    expect(testUpdated).toHaveProperty('id', dataToBeUpdated.id);
    expect(testUpdated).toHaveProperty('name', dataToBeUpdated.name);
    expect(testUpdated).toHaveProperty('enabled', dataToBeUpdated.enabled);
    expect(testUpdated).toHaveProperty('createdAt', dataToBeUpdated.createdAt);
    expect(testUpdated).toHaveProperty('updatedAt', dataToBeUpdated.updatedAt);
  });
});
