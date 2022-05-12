type UserType = {
  id?: string;
  isAdmin?: boolean;
  enabled?: boolean;
  name: string;
  email: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export class User {
  id?: string;
  isAdmin: boolean;
  enabled: boolean;
  name: string;
  email: string;
  createdAt?: Date;
  updatedAt?: Date;

  constructor(user: UserType) {
    const { id, isAdmin, enabled, name, email, createdAt, updatedAt } = user;

    this.id = id;
    this.isAdmin = isAdmin ?? false;
    this.enabled = enabled ?? true;
    this.name = name;
    this.email = email;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;

    Object.freeze(this);
  }
}
