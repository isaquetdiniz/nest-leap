import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const emailTemplate = await prisma.emailTemplate.upsert({
    where: { tag: 'CONFIRMATION_EMAIL_TEMPLATE' },
    update: {},
    create: {
      tag: 'CONFIRMATION_EMAIL_TEMPLATE',
      markups: ['name', 'code'],
      title: 'Confirmação de Conta',
      body: 'Olá, {{ name }}! Esse é o código para você confirmar sua conta. {{ code }}',
      html: null,
    },
  });

  console.log('Emails templated created', emailTemplate);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
