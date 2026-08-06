import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

import * as schema from './db/schema';

const createDb = (connectionString: string) => {
  const client = postgres(connectionString);
  return drizzle(client, { schema });
};

type Db = ReturnType<typeof createDb>;

export { createDb };
export type { Db };

export { schema };
