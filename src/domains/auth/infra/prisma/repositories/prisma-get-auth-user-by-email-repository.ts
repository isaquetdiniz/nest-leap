import { PrismaClient } from '@prisma/client';
import { prismaConnector, PrismaException } from '@/shared/infra/prisma';

import { AuthUserDTO, IGetAuthUserByEmailRepository } from '@/domains/auth';

export class PrismaGetAuthUserByEmailRepository
  implements IGetAuthUserByEmailRepository
{
  private prismaConnection: PrismaClient;

  constructor() {
    this.prismaConnection = prismaConnector.connect();
  }

  async get(email: string): Promise<AuthUserDTO | null> {
    try {
      const [user] = await this.prismaConnection.user.findMany({
        where: { email: email, enabled: true },
        select: {
          id: true,
          isAdmin: true,
          email: true,
          name: true,
        },
      });

      return user;
    } catch (error) {
      throw new PrismaException(error);
    }
  }
}
