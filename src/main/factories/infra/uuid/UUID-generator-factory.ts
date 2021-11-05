import { UUIDGenerator } from '@/application/protocols/uuid';
import { UUIDGeneratorAdapter } from '@/infra/uuid';

export const makeUUIDGeneratorAdapter = (): UUIDGenerator => {
  return new UUIDGeneratorAdapter();
};
