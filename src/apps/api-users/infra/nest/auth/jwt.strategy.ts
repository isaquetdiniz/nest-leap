import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AccessToken, AuthUser } from '@/api-users/domain';
import { GetUserByEmailService } from '@/users/infra';
import { ConfigService } from '@nestjs/config';
import { JwtTokenServiceConfig } from '@/api-users/infra';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    configService: ConfigService<JwtTokenServiceConfig>,
    private readonly getUserByEmailService: GetUserByEmailService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('APP_JWT_ACCESS_TOKEN_SECRET'),
    });
  }

  async validate(accessToken: AccessToken): Promise<AuthUser> {
    console.log(accessToken);

    const { email } = accessToken;

    const user = await this.getUserByEmailService.execute({ email });

    if (!user) {
      throw new UnauthorizedException();
    }

    // We can implement a cache set here to save token - user informations and by-pass database.

    const authUser: AuthUser = {
      id: user.id,
      serial: user.serial,
      state: user.state,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      deletedAt: user.deletedAt,
    };

    return authUser;
  }
}
