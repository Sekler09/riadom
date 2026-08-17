type AuthAccountRecord = {
  providerId?: string | null;
  userId?: string | null;
  idToken?: string | null;
};

type AccountHookContext = {
  context: {
    internalAdapter: {
      updateUser: (
        userId: string,
        data: { tgUsername: string | null },
      ) => Promise<unknown>;
    };
  };
} | null;

export type { AuthAccountRecord, AccountHookContext };
