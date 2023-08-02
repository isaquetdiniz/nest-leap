import { createMock } from 'ts-auto-mock';
import { method, On } from 'ts-auto-mock/extension';
import {
  EmailTemplateNotFoundException,
  IEmailRepository,
  IEmailService,
  IEmailTemplateRepository,
  CreateEmailUseCase as UseCase,
} from '@/notifications/application';
import { EmailFactory } from '@/tests/notifications/factories';

const mockRepository = () => {
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

  return {
    emailTemplateRepository,
    mockGetEmailTemplateByTag,
    emailRepository,
    mockSaveEmail,
    mockUpdateEmail,
  };
};

const mockService = () => {
  const emailService: IEmailService = createMock<IEmailService>();
  const mockSendEmail: jest.Mock = On(emailService).get(
    method((mock) => mock.send),
  );

  return { emailService, mockSendEmail };
};

const makeSut = () => {
  const {
    emailTemplateRepository,
    mockGetEmailTemplateByTag,
    emailRepository,
    mockSaveEmail,
    mockUpdateEmail,
  } = mockRepository();

  const { emailService, mockSendEmail } = mockService();

  const sut = new UseCase(
    emailTemplateRepository,
    emailRepository,
    emailService,
  );

  return {
    sut,
    mockGetEmailTemplateByTag,
    mockSaveEmail,
    mockUpdateEmail,
    mockSendEmail,
  };
};

describe('CreateEmailUseCase', () => {
  beforeEach(() => jest.clearAllMocks());

  describe('With invalid parameters', () => {
    it('TC0001 - Should not create if email template not found', async () => {
      const {
        sut,
        mockGetEmailTemplateByTag,
        mockSaveEmail,
        mockUpdateEmail,
        mockSendEmail,
      } = makeSut();

      const email = EmailFactory.create();

      mockGetEmailTemplateByTag.mockResolvedValueOnce(null);

      const testScript = () =>
        sut.perform({
          to: email.to,
          from: email.from,
          tag: email.template.tag,
        });

      await expect(testScript).rejects.toThrow(EmailTemplateNotFoundException);

      expect(mockGetEmailTemplateByTag).toHaveBeenCalledTimes(1);
      expect(mockGetEmailTemplateByTag).toHaveBeenCalledWith(
        email.template.tag,
      );
      expect(mockSaveEmail).toHaveBeenCalledTimes(0);
      expect(mockUpdateEmail).toHaveBeenCalledTimes(0);
      expect(mockSendEmail).toHaveBeenCalledTimes(0);
    });
  });

  describe('With valid parameters', () => {
    it.todo('Should create email successfully');
  });
});
