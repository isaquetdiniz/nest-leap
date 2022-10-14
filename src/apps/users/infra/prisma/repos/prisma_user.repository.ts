import { PrismaClient, User as UserInPrisma } from '@prisma/client';
import { User, UserEntity } from '@/apps/users/domain';
import { IUserRepository, UserFilters } from '@/apps/users/application';

export class PrismaUserRepository implements IUserRepository {
  constructor(private readonly client: PrismaClient) {}

  static toDomain(userInPrisma: UserInPrisma): User {
    return new UserEntity(userInPrisma);
  }

  async save(entity: User): Promise<User> {
    const userCreated = await this.client.user.create({
      data: entity,
    });

    return PrismaUserRepository.toDomain(userCreated);
  }

  async getById(id: string): Promise<User | null> {
    const userFound = await this.client.user.findUnique({
      where: { id },
    });

    if (!userFound) {
      return null;
    }

    return PrismaUserRepository.toDomain(userFound);
  }

  async getByEmail(email: string): Promise<User | null> {
    const userFound = await this.client.user.findUnique({
      where: { email },
    });

    if (!userFound) {
      return null;
    }

    return PrismaUserRepository.toDomain(userFound);
  }

  async getByFilter(filter: UserFilters): Promise<User[]> {
    const usersFound = await this.client.user.findMany({
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
      orderBy: { [filter.orderBy.property]: filter.orderBy.mode },
    });

    return usersFound.map((userFound) =>
      PrismaUserRepository.toDomain(userFound),
    );
  }

  async count(filter: UserFilters): Promise<number> {
    const usersCount = await this.client.user.count({
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
    const userUpdated = await this.client.user.update({
      where: { id: entity.id },
      data: entity,
    });

    return PrismaUserRepository.toDomain(userUpdated);
  }

  async deleteById(id: string): Promise<void> {
    await this.client.user.delete({
      where: { id },
    });
  }
}
