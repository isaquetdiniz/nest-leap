import * as factory from 'factory.ts';
import * as faker from 'faker';
import { User } from '@/domains/user/entities';

const userFactory = factory.Sync.makeFactory<User>({
  id: factory.each(() => faker.datatype.uuid()),
  name: factory.each(() => faker.name.firstName()),
  email: factory.each(() => faker.internet.email()),
  isAdmin: factory.each(() => faker.datatype.boolean()),
  enabled: factory.each(() => faker.datatype.boolean()),
});

export const UserFactory = userFactory;
