import { tags, servers, securitySchemes } from '@/main/docs/helpers';

import { authPaths, userPaths } from '@/main/docs/paths';

import {
  loginSchema,
  firstAccessSchema,
  createUserSchema,
} from '@/main/docs/schemas';

export default {
  openapi: '3.0.0',
  info: {
    title: 'Node Leap API',
    version: '1.0.0',
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
  schemas: {
    createUserSchema: createUserSchema,
    firstAccess: firstAccessSchema,
    login: loginSchema,
  },
  components: {
    securitySchemes,
  },
};
