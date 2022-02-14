import {
  servers,
  securitySchemes,
  errorSchema,
} from '@/shared/infra/swagger/helpers';

import { authPaths, authTag, authUserSchema } from '@/domains/auth';
import { userPaths, userTag, userSchema } from '@/domains/user';
import {
  testeRatinhoPaths,
  testeRatinhoTag,
  testeRatinhoSchema,
} from '@/domains/teste-ratinho';

const tags = [authTag, userTag, testeRatinhoTag];

const schemas = {
  ...errorSchema,
  ...authUserSchema,
  ...userSchema,
  ...testeRatinhoSchema,
};

export default {
  openapi: '3.0.0',
  info: {
    title: 'Node Leap API',
    version: '0.0.0',
    description: 'API',
    contact: {
      email: 'tech@loomi.com.br',
    },
  },
  servers,
  tags,
  paths: {
    ...authPaths,
    ...userPaths,
    ...testeRatinhoPaths,
  },
  components: {
    securitySchemes,
    schemas,
  },
};
