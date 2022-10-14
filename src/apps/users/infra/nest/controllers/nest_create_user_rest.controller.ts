import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import {
  ApiProperty,
  ApiOperation,
  ApiBody,
  ApiOkResponse,
  ApiBadRequestResponse,
  ApiTags,
} from '@nestjs/swagger';
import { IUserRepository } from '@/apps/users/application';
import {
  CreateUserController,
  ICreateUserResponse,
} from '@/apps/users/interface';
import {
  CognitoUserCloudService,
  CreateUserValidation,
  PrismaUserRepository,
} from '@/apps/users/infra';
import { ILoggerProvider } from '@/shared/application';
import { IValidation } from '@/shared/interface';
import {
  LoggerParam,
  PrismaRepositoryParam,
  ValidationParam,
} from '@/shared/infra';
import { UserState } from '@/apps/users/domain';

export class CreateUserRestRequest {
  @ApiProperty({
    description: 'The name of user.',
  })
  name: string;

  @ApiProperty({
    description: 'The email of user.',
  })
  email: string;

  @ApiProperty({
    description: 'The password of user.',
  })
  password: string;
}

export class CreateUserRestResponse {
  @ApiProperty({
    description: 'The id of user.',
  })
  id: string;

  @ApiProperty({
    description: 'The state of user.',
    enum: UserState,
  })
  state: UserState;

  @ApiProperty({
    description: 'If user is enabled.',
  })
  enabled: boolean;

  @ApiProperty({
    description: 'The name of user.',
  })
  name: string;

  @ApiProperty({
    description: 'The email of user.',
  })
  email: string;

  @ApiProperty({
    description: 'The creation date of user.',
  })
  created_at: Date;

  @ApiProperty({
    description: 'The last updated at date of user.',
  })
  updated_at: Date;

  constructor(props: ICreateUserResponse) {
    this.id = props.id;
    this.state = props.state;
    this.enabled = props.enabled;
    this.name = props.name;
    this.email = props.email;
    this.created_at = props.createdAt;
    this.updated_at = props.updatedAt;
  }
}

@ApiTags('User')
@Controller('users')
export class NestCreateUserRestController {
  @ApiOperation({
    summary: 'Create new user.',
  })
  @ApiBody({
    type: CreateUserRestRequest,
    required: true,
  })
  @ApiOkResponse({
    description: 'User created successfully.',
    type: CreateUserRestResponse,
  })
  @ApiBadRequestResponse({
    description:
      'If any required params are missing or has invalid format or type.',
  })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async execute(
    @PrismaRepositoryParam(PrismaUserRepository)
    userRepository: IUserRepository,
    userCloudService: CognitoUserCloudService,
    @ValidationParam(CreateUserValidation)
    validation: IValidation,
    @LoggerParam(NestCreateUserRestController)
    logger: ILoggerProvider,
    @Body() body: CreateUserRestRequest,
  ): Promise<CreateUserRestResponse> {
    logger.info(body);

    const controller = new CreateUserController(
      userRepository,
      userCloudService,
      validation,
      logger,
    );

    const response = await controller.execute(body);

    return new CreateUserRestResponse(response);
  }
}
