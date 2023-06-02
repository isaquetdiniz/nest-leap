import { faker } from '@faker-js/faker/locale/pt_BR';
import { Test, TestingModule } from '@nestjs/testing';
import { InvalidDataFormatException } from '@/core/application';
import {
  EmailObserver as Observer,
  NotificationsModule,
  TCreateEmailEvent,
  PrismaEmailRepository,
  PrismaEmailTemplateRepository,
} from '@/notifications/infra';
import { EmailFactory } from '@/tests/notifications/factories';
import {
  EmailTemplateNotFoundException,
  IEmailRepository,
  IEmailService,
  IEmailTemplateRepository,
} from '@/notifications/application';
import { AwsSesEmailService } from '@/libs/aws';
import { createMock } from 'ts-auto-mock';
import { On, method } from 'ts-auto-mock/extension';

describe('EmailNestObserver', () => {
  let module: TestingModule;
  let observer: Observer;

  const emailService: IEmailService = createMock<IEmailService>();
  const mockSendEmail: jest.Mock = On(emailService).get(
    method((mock) => mock.send),
  );

  const emailTemplateRepository: IEmailTemplateRepository =
    createMock<IEmailTemplateRepository>();
  const mockGetEmailTemplateByTag: jest.Mock = On(emailTemplateRepository).get(
    method((mock) => mock.getByTag),
  );

  const emailRepository: IEmailRepository = createMock<IEmailRepository>();
  const mockSaveEmail: jest.Mock = On(emailRepository).get(
    method((mock) => mock.save),
  );
  const mockUpdateEmail: jest.Mock = On(emailRepository).get(
    method((mock) => mock.update),
  );

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [NotificationsModule],
    })
      .overrideProvider(AwsSesEmailService)
      .useValue(emailService)
      .overrideProvider(PrismaEmailTemplateRepository)
      .useValue(emailTemplateRepository)
      .overrideProvider(PrismaEmailRepository)
      .useValue(emailRepository)
      .compile();

    observer = module.get<Observer>(Observer);
  });

  beforeEach(() => jest.resetAllMocks());

  describe('With invalid parameters', () => {
    it('TC0001 - Should not create if email invalid params', async () => {
      const tests = [
        observer.handleCreateEmail({
          from: faker.word.noun(),
          to: faker.word.noun(),
          tag: faker.word.noun(),
        }),
      ];

      for (const test of tests) {
        await expect(test).rejects.toThrow(InvalidDataFormatException);
      }

      expect(mockGetEmailTemplateByTag).toHaveBeenCalledTimes(0);
      expect(mockSaveEmail).toHaveBeenCalledTimes(0);
      expect(mockSendEmail).toHaveBeenCalledTimes(0);
      expect(mockUpdateEmail).toHaveBeenCalledTimes(0);
    });

    it('TC0002 - Should not create if email template not found', async () => {
      const email = EmailFactory.create();

      const event: TCreateEmailEvent = {
        from: email.from,
        to: email.to,
        tag: email.template.tag,
      };

      mockGetEmailTemplateByTag.mockResolvedValue(null);

      const testScript = () => observer.handleCreateEmail(event);

      await expect(testScript).rejects.toThrow(EmailTemplateNotFoundException);

      expect(mockGetEmailTemplateByTag).toHaveBeenCalledTimes(1);
      expect(mockGetEmailTemplateByTag).toHaveBeenCalledWith(
        email.template.tag,
      );
      expect(mockSaveEmail).toHaveBeenCalledTimes(0);
      expect(mockSendEmail).toHaveBeenCalledTimes(0);
      expect(mockUpdateEmail).toHaveBeenCalledTimes(0);
    });
  });

  afterAll(() => module.close());
});
