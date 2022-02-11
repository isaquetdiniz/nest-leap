import { servers, securitySchemes } from '@/shared/infra/swagger/helpers';

import { authPaths, authTag } from '@/domains/auth';
import { userPaths, userTag } from '@/domains/user';
import { testeRatinhoPaths, testeRatinhoTag } from '@/domains/teste-ratinho';

const tags = [authTag, userTag, testeRatinhoTag];

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
  },
};
