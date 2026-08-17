import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';
import { tanstackRouter } from '@tanstack/router-plugin/vite';
import { defineConfig, loadEnv } from 'vite';

const repoRoot = path.resolve(__dirname, '../..');

export default defineConfig(({ mode }) => {
  const env = {
    ...loadEnv(mode, repoRoot, ''),
    ...loadEnv(mode, __dirname, ''),
  };

  const ngrokDomain = env.NGROK_DOMAIN ?? '';
  const ngrokHost = env.NGROK_HOST ?? '';

  return {
    plugins: [
      tanstackRouter({
        target: 'react',
        autoCodeSplitting: true,
        routesDirectory: path.resolve(__dirname, './src/app/routes'),
      }),
      react(),
      tailwindcss(),
    ],
    resolve: {
      dedupe: ['react', 'react-dom'],
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      host: true,
      port: 3000,
      allowedHosts: ngrokDomain ? [ngrokDomain] : undefined,
      hmr:
        env.NGROK_HMR === 'true' && ngrokHost
          ? {
              protocol: 'wss',
              host: ngrokHost,
              clientPort: 443,
            }
          : true,
      proxy: {
        '/api': {
          target: 'http://localhost:4000',
          changeOrigin: true,
        },
      },
    },
  };
});
