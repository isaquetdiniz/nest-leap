import { IUserEventEmitter, IUserRepository } from '@/apps/users/application';
import { PrismaUserRepository, UserEventEmitter } from '@/apps/users/infra';
import { EventEmitterParam, Service } from '@/libs/nest';
import { PrismaRepositoryParam } from '@/libs/prisma';
import { UserState } from '@/users/domain';
import {
  CreateUserController,
  CreateUserRequest,
  TCreateUserRequest,
  TCreateUserResponse,
} from '@/users/interface';
import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiOperation,
  ApiProperty,
  ApiTags,
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

  /*
  @ApiProperty({
    description: 'User updated at.',
  })
  updated_at: string;
  */

  constructor(response: TCreateUserResponse) {
    this.id = response.id;
    this.state = response.state;
    this.name = response.name;
    this.email = response.email;
    this.created_at = response.createdAt.toISOString();
  }
}

@ApiTags('Users')
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
    @EventEmitterParam(UserEventEmitter)
    userEventEmitter: IUserEventEmitter,
    @Body() body: CreateUserRestBody,
  ): Promise<CreateUserRestResponse> {
    const controller = new CreateUserController(
      userRepository,
      userEventEmitter,
    );

    const request: TCreateUserRequest = new CreateUserRequest({
      name: body.name,
      email: body.email,
      password: body.password,
    });

    const result = await controller.execute(request);

    const response = new CreateUserRestResponse(result);

    return response;
  }
}
