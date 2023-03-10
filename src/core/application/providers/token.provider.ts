export enum TokenType {
  ACCESS = 'ACCESS',
  REFRESH = 'REFRESH',
  CONFIRM_EMAIL = 'CONFIRM_EMAIL',
  FORGOT_PASSWORD = 'FORGOT_PASSWORD',
}

export interface ITokenProvider {
  generate(type: TokenType, data: Record<string, string | number>): string;

  decrypt(token: string): Record<string, string | number>;
}
