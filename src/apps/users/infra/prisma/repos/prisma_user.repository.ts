import { User as UserInPrisma } from '@prisma/client';
import { User, UserEntity } from '@/users/domain';
import { IUserRepository, UserFilters } from '@/users/application';
import { PrismaService } from '@/libs/prisma';

export class PrismaUserRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaService) {}

  static toDomain(userInPrisma: UserInPrisma): User {
    return new UserEntity(userInPrisma);
  }

  async save(entity: User): Promise<User> {
    const userCreated = await this.prisma.user.create({
      data: entity,
    });

    return PrismaUserRepository.toDomain(userCreated);
  }

  async getById(id: string): Promise<User | null> {
    const userFound = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!userFound) {
      return null;
    }

    return PrismaUserRepository.toDomain(userFound);
  }

  async getByEmail(email: string): Promise<User | null> {
    const userFound = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!userFound) {
      return null;
    }

    return PrismaUserRepository.toDomain(userFound);
  }

  async getByFilter(filter: UserFilters): Promise<User[]> {
    const usersFound = await this.prisma.user.findMany({
      where: {
        ...(filter.name
          ? { name: { contains: filter.name, mode: 'insensitive' } }
          : {}),
        ...(filter.email
          ? { email: { contains: filter.email, mode: 'insensitive' } }
          : {}),
      },
      take: filter.take,
      skip: filter.skip,
      orderBy: { [filter.orderByProperty]: filter.orderByMode },
    });

    return usersFound.map((userFound) =>
      PrismaUserRepository.toDomain(userFound),
    );
  }

  async count(filter: UserFilters): Promise<number> {
    const usersCount = await this.prisma.user.count({
      where: {
        ...(filter.name
          ? { name: { contains: filter.name, mode: 'insensitive' } }
          : {}),
        ...(filter.email
          ? { email: { contains: filter.email, mode: 'insensitive' } }
          : {}),
      },
    });

    return usersCount;
  }

  async update(entity: User): Promise<User> {
    const userUpdated = await this.prisma.user.update({
      where: { id: entity.id },
      data: entity,
    });

    return PrismaUserRepository.toDomain(userUpdated);
  }

  async deleteById(id: string): Promise<void> {
    await this.prisma.user.delete({
      where: { id },
    });
  }
}
