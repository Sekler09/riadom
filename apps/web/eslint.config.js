import { config } from '@repo/eslint-config/react-internal';
import pluginQuery from '@tanstack/eslint-plugin-query';

/** @type {import("eslint").Linter.Config[]} */
export default [...pluginQuery.configs['flat/recommended-strict'], ...config];
