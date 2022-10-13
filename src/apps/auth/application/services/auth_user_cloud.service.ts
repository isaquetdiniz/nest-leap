import { Access } from '@/apps/auth/domain';

type FirstLoginProps = {
  email: string;
  newPassword: string;
  temporaryPassword: string;
};

type ForgotPasswordProps = {
  email: string;
  verificationCode: string;
  newPassword: string;
};

export interface IAuthUserCloudService {
  firstLogin(props: FirstLoginProps): Promise<void>;
  forgotPassword(email: string): Promise<void>;
  confirmForgotPassword(props: ForgotPasswordProps): Promise<void>;
  getByEmail(email: string): Promise<{ email: string; status: string } | null>;
  getByToken(email: string): { email: string } | null;
  getByToken(refreshToken: string): Access;
  login(props: { email: string; password: string }): Promise<Access>;
}
