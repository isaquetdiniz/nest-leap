import {
  IUserConfirmationRepository,
  IUserEventEmitter,
  IUserRepository,
} from '@/users/application';
import {
  PrismaUserConfirmationRepository,
  PrismaUserRepository,
  UserEventEmitter,
} from '@/users/infra';
import { EventEmitterParam, Service } from '@/libs/nest';
import { PrismaRepositoryParam } from '@/libs/prisma';
import {
  ConfirmUserController,
  ConfirmUserRequest,
  TConfirmUserRequest,
} from '@/users/interface';
import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiProperty,
  ApiTags,
  ApiUnauthorizedResponse,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { JwtTokenService } from '../../services/jwt.service';
import { AuthUser } from '@/apps/api-users/domain';
import { IsEmail, IsString, Length } from 'class-validator';

class ConfirmUserRestBody {
  @ApiProperty({
    description: 'The email of user.',
    example: 'abc@email.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'The confirmation code received.',
    example: '00358',
  })
  @IsString()
  @Length(5)
  code: string;
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
@ApiBearerAuth()
export class ConfirmUserRestController {
  constructor(private readonly tokenProvider: JwtTokenService) {}

  @ApiOperation({
    summary: 'Confirm a new user.',
    description: 'Confirm a new user using the code and the email.',
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
    @PrismaRepositoryParam(PrismaUserConfirmationRepository)
    userConfirmationRepository: IUserConfirmationRepository,
    @EventEmitterParam(UserEventEmitter)
    userEventEmitter: IUserEventEmitter,
    @Body() body: ConfirmUserRestBody,
  ): Promise<ConfirmUserRestResponse> {
    const controller = new ConfirmUserController(
      userRepository,
      userConfirmationRepository,
      userEventEmitter,
    );

    const request: TConfirmUserRequest = new ConfirmUserRequest({
      code: body.code,
      email: body.email,
    });

    const result = await controller.execute(request);

    const authUser: AuthUser = {
      id: result.id,
      state: result.state,
      name: result.name,
      email: result.email,
    };

    const accessToken = await this.tokenProvider.generate(authUser);

    return {
      access_token: accessToken,
    };
  }
}
