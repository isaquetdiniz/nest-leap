export type AuthUserDTO = {
  id: string;
  isAdmin: boolean;
  email: string;
  name: string;
};

export class AuthUser {
  id: string;
  isAdmin: boolean;
  email: string;
  name: string;

  constructor(params: AuthUserDTO) {
    const { id, isAdmin, email, name } = params;

    this.id = id;
    this.isAdmin = isAdmin;
    this.email = email;
    this.name = name;
  }
}
