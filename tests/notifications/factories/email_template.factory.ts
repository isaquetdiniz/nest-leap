import { faker } from '@faker-js/faker/locale/pt_BR';
import { EmailTemplate, EmailTemplateEntity } from '@/notifications/domain';

class Factory {
  create(props?: EmailTemplate): EmailTemplateEntity {
    return new EmailTemplateEntity({
      tag: faker.random.word(),
      markups: Array.from({ length: 3 }, () => faker.random.word()),
      title: faker.lorem.slug(),
      body: faker.random.words(),
      ...props,
    });
  }

  createMany(num: number): EmailTemplateEntity[] {
    return Array.from({ length: num }, () => this.create());
  }
}

export const EmailTemplateFactory = new Factory();
