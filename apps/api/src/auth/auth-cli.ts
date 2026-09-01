import { validateEnv } from '../config/env';
import { createAuth } from './create-auth';

export const auth = createAuth(validateEnv(process.env));
