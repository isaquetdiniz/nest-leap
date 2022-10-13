import { Access, AuthUser } from '@/apps/auth/domain';
import {
  AuthUserAlreadyMadeFirstLoginException,
  AuthUserNotFoundException,
  IAuthUserRepository,
  IAuthUserCloudService,
} from '@/apps/auth/application';

import { ILoggerProvider, IUsecase } from '@/shared/application';

type FirstLoginResponse = { access: Access; authUser: AuthUser };
type FirstLoginProps = {
  email: string;
  newPassword: string;
  temporaryPassword: string;
};

export class FirstLoginUsecase
  implements IUsecase<FirstLoginProps, FirstLoginResponse>
{
  constructor(
    private readonly authUserRepository: IAuthUserRepository,
    private readonly authUserCloudService: IAuthUserCloudService,
    private readonly logger: ILoggerProvider,
  ) {}

  async perform(data: FirstLoginProps): Promise<FirstLoginResponse> {
    this.logger.debug({ message: 'Request received', data });

    const { email, newPassword, temporaryPassword } = data;

    const authUser = await this.authUserRepository.getByEmail(email);

    if (!authUser) throw new AuthUserNotFoundException({ email });

    this.logger.debug({ message: 'Auth User found', data: authUser });

    const cloudAuthUser = await this.authUserCloudService.getByEmail(email);

    if (!cloudAuthUser) throw new AuthUserNotFoundException({ email });

    this.logger.debug({
      message: 'Auth User found in cloud',
      data: cloudAuthUser,
    });

    const { status: cloudAuthUserStatus } = cloudAuthUser;

    if (cloudAuthUserStatus !== 'FORCE_CHANGE_PASSWORD') {
      throw new AuthUserAlreadyMadeFirstLoginException(authUser);
    }

    await this.authUserCloudService.firstLogin({
      email,
      newPassword,
      temporaryPassword,
    });

    const access = await this.authUserCloudService.login({
      email,
      password: newPassword,
    });

    this.logger.debug({
      message: 'Auth User made first login',
      data: authUser,
    });

    return { access, authUser };
  }
}
