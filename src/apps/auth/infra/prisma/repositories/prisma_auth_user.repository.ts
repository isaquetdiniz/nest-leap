import { PrismaClient } from '@prisma/client';

import { prismaConnector, PrismaException } from '@/shared/infra/prisma';

import { IAuthUserRepository } from '@/apps/auth/application';
import { AuthUser } from '@/apps/auth/domain';

export class PrismaAuthUserRepository implements IAuthUserRepository {
  private prismaConnection: PrismaClient;

  constructor() {
    this.prismaConnection = prismaConnector.connect();
  }

  async getByEmail(email: string): Promise<AuthUser> {
    try {
      const [user] = await this.prismaConnection.user.findMany({
        where: { email, enabled: true },
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
