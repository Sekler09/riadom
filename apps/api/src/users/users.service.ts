import { Injectable } from '@nestjs/common';

import { user } from '@repo/db/schema';
import { User } from 'src/auth/create-auth';
import { DbAdapter } from 'src/db/database.module';
import { eq } from 'drizzle-orm';
import { TransactionHost } from '@nestjs-cls/transactional';

@Injectable()
export class UsersService {
  constructor(private readonly txHost: TransactionHost<DbAdapter>) {}

  onboardUser(userId: User['id']) {
    return this.txHost.tx
      .update(user)
      .set({ isOnboarded: true })
      .where(eq(user.id, userId))
      .returning();
  }
}
