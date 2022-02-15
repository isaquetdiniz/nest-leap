import {
  servers,
  securitySchemes,
  errorSchema,
} from '@/shared/infra/swagger/helpers';

import { authPaths, authTag, authUserSchema } from '@/domains/auth';
import { userPaths, userTag, userSchema } from '@/domains/user';

const tags = [authTag, userTag];

const schemas = {
  ...errorSchema,
  ...authUserSchema,
  ...userSchema,
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
  },
  components: {
    securitySchemes,
    schemas,
  },
};
