import { TransactionalAdapterDrizzleOrm } from '@nestjs-cls/transactional-adapter-drizzle-orm';
import { Module } from '@nestjs/common';
import { createDb } from '@repo/db';
import { ENV_CONFIG, type EnvConfig } from 'src/config/env';
import { Database } from '@repo/db';

export const DB = Symbol.for('DB');
export type DbAdapter = TransactionalAdapterDrizzleOrm<Database>;

@Module({
  providers: [
    {
      inject: [ENV_CONFIG],
      useFactory: (config: EnvConfig) => createDb(config.DATABASE_URL),
      provide: DB,
    },
  ],
  exports: [DB],
})
export class DatabaseModule {}
