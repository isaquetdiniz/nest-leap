import { faker } from '@faker-js/faker/locale/pt_BR';
import { Email, EmailEntity, EmailState } from '@/notifications/domain';
import { EmailTemplateFactory } from './email_template.factory';

class Factory {
  create(props?: Email): EmailEntity {
    const states = Object.values(EmailState);

    return new EmailEntity({
      state: states[Math.floor(Math.random() * states.length)],
      template: EmailTemplateFactory.create(),
      to: faker.internet.email(),
      from: faker.internet.email(),
      title: faker.random.word(),
      body: faker.lorem.lines(),
      ...props,
    });
  }

  createMany(num: number): EmailEntity[] {
    return Array.from({ length: num }, () => this.create());
  }
}

export const EmailFactory = new Factory();
