import { PrismaClient } from '@prisma/client';
import { PrismaService } from '@/libs/prisma';
import { faker } from '@faker-js/faker/locale/pt_BR';
import { Test, TestingModule } from '@nestjs/testing';
import { InvalidDataFormatException } from '@/core/application';
import { BatataAlreadyExistsException } from '@/batata/application/exceptions';
import { CreateBatataNestService as Controller } from '@/batata/infra/nest/services';
import { BatataFactory } from '@/tests/batata/factories';
import { BatataModule } from '@/batata/infra/nest/modules';

describe('CreateBatataNestService', () => {
  let module: TestingModule;
  let controller: Controller;
  let prisma: PrismaClient;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [BatataModule],
    }).compile();
    controller = module.get<Controller>(Controller);
    prisma = module.get<PrismaService>(PrismaService);
  });

  beforeEach(() => jest.resetAllMocks());

  describe('With valid parameters', () => {
    it('Should create batata successfully', async () => {
      const batataCreated = await controller.execute({
        name: faker.random.alpha(10),
      });

      const batataFound = await prisma.batata.findFirst({
        where: {
          id: batataCreated.id,
        },
      });

      expect(batataFound).toBeDefined();
      expect(batataFound.name).toBe(batataCreated.name);
    });
  });

  describe('With invalid parameters', () => {
    it('Should not create with invalid request', async () => {
      const tests = [
        controller.execute({
          name: null,
        }),
        controller.execute({
          name: '!@?' + faker.random.alpha(10),
        }),
      ];

      for (const test of tests) {
        await expect(test).rejects.toThrow(InvalidDataFormatException);
      }
    });

    it('Should not create if batata exists', async () => {
      const batata = await BatataFactory.create();

      await prisma.batata.create({
        data: batata,
      });

      const testScript = () =>
        controller.execute({
          name: batata.name,
        });

      await expect(testScript).rejects.toThrow(BatataAlreadyExistsException);
    });
  });

  afterAll(() => module.close());
});
