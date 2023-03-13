import {
  ITokenProvider,
  MissingEnvVarException,
  TokenType,
} from '@/core/application';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { isString } from 'class-validator';

export interface JwtConfirmEmailTokenConfig {
  APP_JWT_CONFIRM_EMAIL_TOKEN_VERSION: string;
  APP_JWT_CONFIRM_EMAIL_TOKEN_SECRET: string;
  APP_JWT_CONFIRM_EMAIL_TOKEN_EXPIRES_IN: number;
}

export interface JwtAccessTokenConfig {
  APP_JWT_ACCESS_TOKEN_VERSION: string;
  APP_JWT_ACCESS_TOKEN_SECRET: string;
  APP_JWT_ACCESS_TOKEN_EXPIRES_IN: number;
}

export type JwtTokenServiceConfig = JwtConfirmEmailTokenConfig &
  JwtAccessTokenConfig;

@Injectable()
export class JwtTokenService implements ITokenProvider {
  confirmEmailTokenVersion: string;
  confirmEmailTokenSecret: string;
  confirmEmailTokenExpiresIn: number;

  accessTokenVersion: string;
  accessTokenSecret: string;
  accessTokenExpiresIn: number;

  constructor(
    private readonly configService: ConfigService<JwtTokenServiceConfig>,
    private readonly jwtService: JwtService,
  ) {
    this.loadConfirmTokenInformations();
    this.loadAccessTokenInformations();
  }

  loadConfirmTokenInformations() {
    this.confirmEmailTokenVersion = this.configService.get<string>(
      'APP_JWT_CONFIRM_EMAIL_TOKEN_VERSION',
    );

    if (!this.confirmEmailTokenVersion) {
      throw new MissingEnvVarException('APP_JWT_CONFIRM_EMAIL_TOKEN_VERSION');
    }

    this.confirmEmailTokenSecret = this.configService.get<string>(
      'APP_JWT_CONFIRM_EMAIL_TOKEN_SECRET',
    );

    if (!this.confirmEmailTokenSecret) {
      throw new MissingEnvVarException('APP_JWT_CONFIRM_EMAIL_TOKEN_SECRET');
    }

    this.confirmEmailTokenExpiresIn = Number(
      this.configService.get<number>('APP_JWT_CONFIRM_EMAIL_TOKEN_EXPIRES_IN'),
    );

    if (!this.confirmEmailTokenExpiresIn) {
      throw new MissingEnvVarException(
        'APP_JWT_CONFIRM_EMAIL_TOKEN_EXPIRES_IN',
      );
    }
  }

  loadAccessTokenInformations() {
    this.accessTokenVersion = this.configService.get<string>(
      'APP_JWT_ACCESS_TOKEN_VERSION',
    );

    if (!this.accessTokenVersion) {
      throw new MissingEnvVarException('APP_JWT_ACCESS_TOKEN_VERSION');
    }

    this.accessTokenSecret = this.configService.get<string>(
      'APP_JWT_ACCESS_TOKEN_SECRET',
    );

    if (!this.accessTokenSecret) {
      throw new MissingEnvVarException('APP_JWT_ACCESS_TOKEN_SECRET');
    }

    this.accessTokenExpiresIn = Number(
      this.configService.get<number>('APP_JWT_ACCESS_TOKEN_EXPIRES_IN'),
    );

    if (!this.accessTokenExpiresIn) {
      throw new MissingEnvVarException('APP_JWT_ACCESS_TOKEN_EXPIRES_IN');
    }
  }

  generate(type: TokenType, data: Record<string, string | number>): string {
    if (type === TokenType.CONFIRM_EMAIL) {
      const options: JwtSignOptions = {
        secret: this.confirmEmailTokenSecret,
        expiresIn: this.confirmEmailTokenExpiresIn,
      };

      const token = this.jwtService.sign(
        { ...data, type: TokenType.CONFIRM_EMAIL },
        options,
      );

      return token;
    }

    if (type === TokenType.ACCESS) {
      const options: JwtSignOptions = {
        secret: this.accessTokenSecret,
        expiresIn: this.accessTokenExpiresIn,
      };

      const token = this.jwtService.sign(
        { ...data, type: TokenType.ACCESS },
        options,
      );

      return token;
    }
  }

  decrypt(token: string): Record<string, string> {
    const plain = this.jwtService.decode(token);

    if (isString(plain)) {
      return JSON.parse(plain);
    }

    return plain;
  }
}
