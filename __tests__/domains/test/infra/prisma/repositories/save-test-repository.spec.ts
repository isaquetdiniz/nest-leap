import { PrismaSaveTestRepository } from '@/domains/test';
import { prismaConnector } from '@/shared/infra/prisma/index';

import { mockCreateTestParams } from '@/tests/domains/test/entities/mocks/test-mocks';
import { PrismaClient } from '@prisma/client';

const makeSut = () => {
  const sut = new PrismaSaveTestRepository();

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

  it('should create a test', async () => {
    const { sut } = makeSut();

    const fakeTest = mockCreateTestParams();

    const testCreated = await sut.save(fakeTest);

    expect(testCreated.id).toBeTruthy();
    expect(testCreated).toHaveProperty('id');
    expect(testCreated).toHaveProperty('name', fakeTest.name);
    expect(testCreated).toHaveProperty('enabled', fakeTest.enabled);
    expect(testCreated).toHaveProperty('createdAt');
    expect(testCreated).toHaveProperty('updatedAt');
  });
});
