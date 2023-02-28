import { INestApplicationContext } from '@nestjs/common';

export async function shutdown(app?: INestApplicationContext, error?: Error) {
  await app?.flushLogs();
  await app?.close();
}
