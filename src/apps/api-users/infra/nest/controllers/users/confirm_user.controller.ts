import { IUserEventEmitter, IUserRepository } from '@/apps/users/application';
import { PrismaUserRepository, UserEventEmitter } from '@/apps/users/infra';
import { TokenType } from '@/core/application';
import { EventEmitterParam, JwtTokenService, Service } from '@/libs/nest';
import { PrismaRepositoryParam } from '@/libs/prisma';
import {
  ConfirmUserController,
  ConfirmUserRequest,
  TConfirmUserRequest,
} from '@/users/interface';
import { Body, Controller, ForbiddenException, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiOperation,
  ApiProperty,
  ApiTags,
  ApiUnauthorizedResponse,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';

class ConfirmUserRestBody {
  @ApiProperty({
    description: 'The JWT confirm token.',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjI0MzE3MjA3LTdhMmYtNDg5ZC1hNjZiLTExMzExODlhZTdiMSIsImVtYWlsIjoiaXNhcXVlQGxvb21pLmNvbS5iciIsImlhdCI6MTY3ODcyMzQ3OSwiZXhwIjoxNjc4NzI3MDc5fQ.t6f1VZMvgktRBIX_yOueXNn5elRD7-Dho5i17zeJHmA',
  })
  confirm_token: string;
}

class ConfirmUserRestResponse {
  @ApiProperty({
    description: 'The JWT access token.',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjI0MzE3MjA3LTdhMmYtNDg5ZC1hNjZiLTExMzExODlhZTdiMSIsImVtYWlsIjoiaXNhcXVlQGxvb21pLmNvbS5iciIsImlhdCI6MTY3ODcyMzQ3OSwiZXhwIjoxNjc4NzI3MDc5fQ.t6f1VZMvgktRBIX_yOueXNn5elRD7-Dho5i17zeJHmA',
  })
  access_token: string;
}

@ApiTags('Users')
@Controller('users/confirm')
@Service()
export class ConfirmUserRestController {
  constructor(private readonly tokenService: JwtTokenService) {}

  @ApiOperation({
    summary: 'Confirm a new user.',
    description: 'Confirm a new user using the confirm token.',
  })
  @ApiOkResponse({
    description: 'The access token returned successfully.',
    type: ConfirmUserRestResponse,
  })
  @ApiUnauthorizedResponse({
    description: 'User authentication failed.',
  })
  @ApiBadRequestResponse({
    description:
      'If any required params are missing or has invalid format or type.',
  })
  @ApiUnprocessableEntityResponse({
    description:
      'If any required params are missing or has invalid format or type.',
  })
  @Post()
  async execute(
    @PrismaRepositoryParam(PrismaUserRepository)
    userRepository: IUserRepository,
    @EventEmitterParam(UserEventEmitter)
    userEventEmitter: IUserEventEmitter,
    @Body() body: ConfirmUserRestBody,
  ): Promise<ConfirmUserRestResponse> {
    const controller = new ConfirmUserController(
      userRepository,
      userEventEmitter,
    );

    const { type, id, email } = this.tokenService.decrypt(body.confirm_token);

    if (type !== TokenType.CONFIRM_EMAIL) {
      throw new ForbiddenException();
    }

    const request: TConfirmUserRequest = new ConfirmUserRequest({
      id,
      email,
    });

    const result = await controller.execute(request);

    const accessToken = this.tokenService.generate(TokenType.ACCESS, {
      id: result.id,
      email: result.email,
    });

    return {
      access_token: accessToken,
    };
  }
}
