import { UserError } from '@/domain/errors';

type UserInput = {
  id: string;
  isAdmin: boolean;
  name: string;
  email: string;
  enabled?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
};

type UserToJSON = {
  id: string;
  isAdmin: boolean;
  name: string;
  email: string;
  enabled: boolean;
  createdAt: Date;
  updatedAt: Date;
};

class User {
  private readonly id: string;
  private readonly isAdmin: boolean;
  private readonly enabled: boolean;
  private readonly name: string;
  private readonly email: string;
  private readonly createdAt: Date;
  private readonly updatedAt: Date;

  constructor(createUserParams: UserInput) {
    const { id, isAdmin, name, email, enabled, createdAt, updatedAt } =
      createUserParams;

    if (id === null || id === undefined) {
      throw new UserError('ID is not passed');
    }

    if (isAdmin === null || isAdmin === undefined) {
      throw new UserError('isAdmin is not passed');
    }

    if (name === null || name === undefined) {
      throw new UserError('Email is not passed');
    }

    this.id = id;
    this.isAdmin = isAdmin;
    this.name = name;
    this.email = email;
    this.enabled = enabled || true;
    this.createdAt = createdAt || new Date();
    this.updatedAt = updatedAt || new Date();
  }

  toJSON(): UserToJSON {
    return {
      id: this.id,
      isAdmin: this.isAdmin,
      enabled: this.enabled,
      name: this.name,
      email: this.email,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}

export { User, UserInput, UserToJSON };
