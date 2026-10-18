// Netlify Function that serves every Expo Router route (SSR pages, loaders,
// API routes) from the server bundle `expo export` writes to dist/server.
// Static files in dist/client are served by the CDN first (preferStatic).
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';

// The adapter's ESM build isn't loadable from a Netlify bundle, so load the CommonJS one
const require = createRequire(import.meta.url);
const { createRequestHandler } = require('expo-server/adapter/netlify');

export default createRequestHandler({
  build: fileURLToPath(new URL('../../dist/server', import.meta.url)),
});

export const config = {
  path: '/*',
  // Legacy URLs are redirected by netlify.toml instead
  excludedPath: ['/home', '/courses-tab', '/majors-tab', '/teachers-tab'],
  preferStatic: true,
};
