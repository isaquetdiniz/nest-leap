import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthUser } from '@/api-users/domain';
import { GetUserByEmailService } from '@/users/infra';
import { UserState } from '@/apps/users/domain';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly getUserByEmailService: GetUserByEmailService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  async validate(email: string, password: string): Promise<AuthUser> {
    const user = await this.getUserByEmailService.execute({ email });

    if (
      !user ||
      user.state !== UserState.CONFIRMED ||
      user.password !== password
    ) {
      throw new UnauthorizedException();
    }

    return {
      id: user.id,
      serial: user.serial,
      state: user.state,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      deletedAt: user.deletedAt,
    };
  }
}
