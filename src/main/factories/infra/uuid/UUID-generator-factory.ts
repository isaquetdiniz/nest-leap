import { UUIDGenerator } from '@/application/protocols/utils';
import { UUIDGeneratorAdapter } from '@/infra/uuid';

export const makeUUIDGeneratorAdapter = (): UUIDGenerator => {
  return new UUIDGeneratorAdapter();
};
