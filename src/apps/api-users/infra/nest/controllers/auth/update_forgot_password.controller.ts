import { IsEqualThan, IsPassword } from '@/libs/class-validator';
import { Public, Service } from '@/libs/nest';
import { Body, Controller, Param, Patch } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiProperty,
  ApiPropertyOptional,
  ApiTags,
  ApiUnauthorizedResponse,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { IsString, IsUUID, Length } from 'class-validator';

class UpdateForgotPasswordParams {
  @ApiProperty({
    description: 'The forgot password id.',
    example: '20879d85-303d-4ebc-ba11-4ca85f3beebd',
  })
  @IsUUID()
  id: string;
}

class UpdateForgotPasswordRestBody {
  @ApiProperty({
    description: 'The confirmation code.',
    example: '00000',
  })
  @IsString()
  @Length(5)
  code: string;

  @ApiProperty({
    description: 'The new password.',
    example: '00000',
  })
  @IsPassword()
  new_password: string;

  @ApiProperty({
    description: 'The new password confirmation.',
    example: '00000',
  })
  @IsEqualThan('new_password')
  new_password_confirmation: string;
}

class UpdateForgotPasswordRestResponse {
  @ApiPropertyOptional({
    type: 'string',
    description:
      'JWT access token. Token used to access all protected endpoints.',
  })
  access_token?: string;

  @ApiPropertyOptional({
    description: 'Result of user forgot password operation.',
    example: 'CONFIRMED',
  })
  state!: string;
}

@ApiTags('Auth')
@Controller('auth/forgot-password/:id')
@Public()
@Service()
export class UpdateForgotPasswordRestController {
  @ApiOperation({
    summary: 'User update forgot password.',
    description: 'Endpoint to update forgot password.',
  })
  @ApiBody({
    type: UpdateForgotPasswordRestBody,
    required: true,
    description:
      'UpdateForgotPassword requires id, code, new password and new password confirmation.',
  })
  @ApiOkResponse({
    description: 'The forgot password updated.',
    type: UpdateForgotPasswordRestResponse,
  })
  @ApiUnauthorizedResponse({
    description: 'Access token authentication failed.',
  })
  @ApiBadRequestResponse({
    description:
      'If any required params are missing or has invalid format or type.',
  })
  @ApiUnprocessableEntityResponse({
    description:
      'If any required params are missing or has invalid format or type.',
  })
  @Patch()
  async execute(
    @Param() params: UpdateForgotPasswordParams,
    @Body() body: UpdateForgotPasswordRestBody,
  ): Promise<UpdateForgotPasswordRestResponse> {
    return {
      access_token: null,
      state: 'DECLINED',
    };
  }
}
