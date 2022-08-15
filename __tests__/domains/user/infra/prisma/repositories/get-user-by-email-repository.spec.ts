import { PrismaClient } from '@prisma/client';
import { User } from '@/domains/user/entities';

import { UserFactory } from '@/tests/domains/user/entities';
import { PrismaGetUserByEmailRepository } from '@/domains/user/infra/prisma/repositories';
import { prismaConnector } from '@/shared/infra/prisma/index';

const makeSut = () => {
  const sut = new PrismaGetUserByEmailRepository();

  return {
    sut,
  };
};

describe('Prisma Get User by Name Repository', () => {
  let prismaTest: PrismaClient | null = null;
  beforeAll(async () => {
    prismaTest = prismaConnector.connect(process.env.DATABASE_TEST_URL);
    if (prismaTest) {
      await prismaTest.user.deleteMany({});
    }
  });

  afterEach(async () => {
    if (prismaTest) {
      await prismaTest.user.deleteMany({});
    }
  });

  afterAll(async () => {
    if (prismaTest) {
      await prismaTest.$disconnect();
    }
  });

  it('should list a user by name', async () => {
    const { sut } = makeSut();

    const fakeUser = UserFactory.build();

    const userCreated = await prismaTest?.user.create({
      data: fakeUser,
    });

    const user = await sut.getByEmail(fakeUser.email);

    const expectedResult = new User({
      ...fakeUser,
      createdAt: userCreated?.createdAt,
      updatedAt: userCreated?.updatedAt,
    });

    expect(user).toStrictEqual(expectedResult);
  });
});
