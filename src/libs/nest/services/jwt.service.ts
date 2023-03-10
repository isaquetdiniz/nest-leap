import { ITokenProvider, TokenType } from '@/core/application';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { isString } from 'class-validator';

export interface JwtConfirmEmailTokenConfig {
  APP_JWT_CONFIRM_EMAIL_TOKEN_VERSION: string;
  APP_JWT_CONFIRM_EMAIL_TOKEN_SECRET: string;
  APP_JWT_CONFIRM_EMAIL_TOKEN_EXPIRES_IN: number;
}

export type JwtTokenServiceConfig = JwtConfirmEmailTokenConfig;

@Injectable()
export class JwtTokenService implements ITokenProvider {
  [TokenType.CONFIRM_EMAIL]: JwtConfirmEmailTokenConfig;

  constructor(
    private readonly configService: ConfigService<JwtTokenServiceConfig>,
    private readonly jwtService: JwtService,
  ) {
    this[TokenType.CONFIRM_EMAIL] = {
      APP_JWT_CONFIRM_EMAIL_TOKEN_VERSION: this.configService.get<string>(
        'APP_JWT_CONFIRM_EMAIL_TOKEN_VERSION',
      ),
      APP_JWT_CONFIRM_EMAIL_TOKEN_SECRET: this.configService.get<string>(
        'APP_JWT_CONFIRM_EMAIL_TOKEN_SECRET',
      ),
      APP_JWT_CONFIRM_EMAIL_TOKEN_EXPIRES_IN: Number(
        this.configService.get<number>(
          'APP_JWT_CONFIRM_EMAIL_TOKEN_EXPIRES_IN',
        ),
      ),
    };
  }

  generate(type: TokenType, data: Record<string, string | number>): string {
    if (type === TokenType.CONFIRM_EMAIL) {
      const options: JwtSignOptions = {
        secret: this[type].APP_JWT_CONFIRM_EMAIL_TOKEN_SECRET,
        expiresIn: this[type].APP_JWT_CONFIRM_EMAIL_TOKEN_EXPIRES_IN,
      };

      const token = this.jwtService.sign(data, options);

      return token;
    }
  }

  decrypt(token: string): Record<string, string | number> {
    const plain = this.jwtService.decode(token);

    if (isString(plain)) {
      return JSON.parse(plain);
    }

    return plain;
  }
}
