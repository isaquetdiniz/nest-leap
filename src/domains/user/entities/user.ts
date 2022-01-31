export interface UserDTO {
  id?: string;
  isAdmin?: boolean;
  enabled?: boolean;
  name: string;
  email: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class User {
  id?: string;
  isAdmin: boolean;
  enabled: boolean;
  name: string;
  email: string;
  createdAt?: Date;
  updatedAt?: Date;

  constructor(userParams: UserDTO) {
    const { id, isAdmin, enabled, name, email, createdAt, updatedAt } =
      userParams;

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
