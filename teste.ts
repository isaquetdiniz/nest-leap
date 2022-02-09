export interface User {
  email: string;
  type: string;
  password: string;
}

type Teste = Omit<User, 'password'>;

const obj: Teste = {
  email: 'isaque',
  type: 'isaque',
  password: 'top',
};
