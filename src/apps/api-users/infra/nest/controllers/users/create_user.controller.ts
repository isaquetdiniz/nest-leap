import { IUserRepository } from '@/apps/users/application';
import { CreateUserValidation, PrismaUserRepository } from '@/apps/users/infra';
import { ILoggerProvider } from '@/core/application';
import { IValidation } from '@/core/interface';
import { LoggerParam, Service, ValidationParam } from '@/libs/nest';
import { PrismaRepositoryParam } from '@/libs/prisma';
import { UserState } from '@/users/domain';
import {
  CreateUserController,
  ICreateUserRequest,
  ICreateUserResponse,
} from '@/users/interface';
import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiOperation,
  ApiProperty,
  ApiUnauthorizedResponse,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';

class CreateUserRestBody {
  @ApiProperty({
    description: 'The name of new user.',
    example: 'Jorge',
  })
  name: string;

  @ApiProperty({
    description: 'The email of new user.',
    example: 'abc@email.com',
  })
  email: string;

  @ApiProperty({
    description: 'The pasword of new user.',
    example: '007NoTimeToDie',
  })
  password: string;
}

class CreateUserRestResponse {
  @ApiProperty({
    description: 'User id.',
    example: '12123',
  })
  id: string;

  @ApiProperty({
    description: 'User state.',
    enum: UserState,
    example: UserState.PENDING_CONFIRMATION,
  })
  state: UserState;

  @ApiProperty({
    description: 'User name.',
    example: 'Jorbe',
  })
  name: string;

  @ApiProperty({
    description: 'User email.',
    example: 'abc@email.com',
  })
  email: string;

  @ApiProperty({
    description: 'User created at.',
  })
  created_at: string;

  @ApiProperty({
    description: 'User updated at.',
  })
  updated_at: string;

  constructor(response: ICreateUserResponse) {
    this.id = response.id;
    this.state = response.state;
    this.name = response.name;
    this.email = response.email;
    this.created_at = response.createdAt.toISOString();
    this.updated_at = response.updatedAt.toISOString();
  }
}

@Controller('users')
@Service()
export class CreateUserRestController {
  @ApiOperation({
    summary: 'Create a new user.',
    description: 'Create a new user using name, email and password.',
  })
  @ApiOkResponse({
    description: 'The wallet accounts returned successfully.',
    type: CreateUserRestResponse,
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
    @ValidationParam(CreateUserValidation)
    validation: IValidation,
    @LoggerParam()
    logger: ILoggerProvider,
    @Body() body: CreateUserRestBody,
  ): Promise<CreateUserRestResponse> {
    const controller = new CreateUserController(
      userRepository,
      validation,
      logger,
    );

    const request: ICreateUserRequest = {
      name: body.name,
      email: body.email,
    };

    const result = await controller.execute(request);

    const response = new CreateUserRestResponse(result);

    return response;
  }
}
