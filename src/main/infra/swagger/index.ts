import { servers, securitySchemes } from '@/shared/infra/swagger/helpers';

import { authPaths, authTag } from '@/domains/auth';
import { userPaths, userTag } from '@/domains/user';

const tags = [authTag, userTag];

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
  },
};
