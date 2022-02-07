import { PrismaClient } from '.prisma/client';
import { prismaConnector } from '@/shared/infra/prisma';

import { AuthUserDTO, IGetAuthUserByEmailRepository } from '@/domains/auth';

export class PrismaGetAuthUserByEmailRepository
  implements IGetAuthUserByEmailRepository
{
  private prismaConnection: PrismaClient;

  constructor() {
    this.prismaConnection = prismaConnector.connect();
  }

  async get(email: string): Promise<AuthUserDTO> {
    const [user] = await this.prismaConnection.user.findMany({
      where: { email: email },
      select: {
        id: true,
        isAdmin: true,
        email: true,
        name: true,
      },
    });

    return user;
  }
}
