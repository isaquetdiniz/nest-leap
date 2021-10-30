import env from '@/main/config/env';

const protocolMap = ['http', 'https'];
const urlMap = [`localhost:${env.port}`, env.deployUrl];

const protocol = env.mode === 'development' ? protocolMap[0] : protocolMap[1];

const url = env.mode === 'development' ? urlMap[0] : urlMap[1];

export const servers = [
  {
    url: '{protocol}://{url}',
    variables: {
      url: {
        enum: urlMap,
        default: url,
      },
      protocol: {
        enum: protocolMap,
        default: protocol,
      },
    },
  },
];
