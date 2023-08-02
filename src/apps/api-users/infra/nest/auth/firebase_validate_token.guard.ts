import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

import { Request } from 'express';
import { FirebaseGetAuthUserByToken } from '@/api-users/infra/nest/services';
import { MissingBearerTokenException } from '@/core/application';
import { PrismaUserRepository } from '@/users/infra/prisma/repos';
import { UserMustCompleteOnboardingException } from '@/users/application';
import { Reflector } from '@nestjs/core/services';
import { IS_PUBLIC_KEY } from '@/libs/nest';

@Injectable()
export class FirebaseValidateTokenGuard implements CanActivate {
  constructor(
    private readonly firebaseGetAuthUserByToken: FirebaseGetAuthUserByToken,
    private readonly userRepository: PrismaUserRepository,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const request: Request = context.switchToHttp().getRequest();

    const token = this.validToken(request);

    const userFirebase = await this.firebaseGetAuthUserByToken.get(token);

    // CRIAR MÉTODO NO REPOSITÓRIO DO USUÁRIO PARA FAZER O GET DO USUÁRIO PELO FIREBASE_ID
    // UTILIZAR O EXEMPLO ABAIXO COMO PADRÃO

    // const user = await this.userRepository.getByFirebaseId(
    //   userFirebase.firebaseId,
    // );

    // if (!user) {
    //   const { firebaseId, email } = userFirebase;

    //   throw new UserMustCompleteOnboardingException({ firebaseId, email });
    // }

    request.user = {
      // id: user.id,
      firebaseId: userFirebase.firebaseId,
      email: userFirebase.email,
    };

    return true;
  }

  validToken(request: Request) {
    const authorizationHeader = request.headers.authorization;

    if (!authorizationHeader) {
      throw new MissingBearerTokenException();
    }

    const [, token] = authorizationHeader.split(' ');

    return token;
  }
}
