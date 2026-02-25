import {
  AngularAppEngine,
  createRequestHandler,
  ɵsetAngularAppEngineManifest,
  ɵsetAngularAppManifest,
} from '@angular/ssr';
import { getContext } from '@netlify/angular-runtime/context.mjs';

import angularAppManifest from './angular-app-manifest.mjs';
import angularAppEngineManifest from './angular-app-engine-manifest.mjs';

ɵsetAngularAppManifest(angularAppManifest);
ɵsetAngularAppEngineManifest(angularAppEngineManifest);

const angularAppEngine = new AngularAppEngine();

export async function netlifyAppEngineHandler(request: Request): Promise<Response> {
  const context = getContext();

  // Example API endpoints can be defined here.
  // Uncomment and define endpoints as necessary.
  // const pathname = new URL(request.url).pathname;
  // if (pathname === '/api/hello') {
  //   return Response.json({ message: 'Hello from the API' });
  // }

  const result = await angularAppEngine.handle(request, context);
  return result || new Response('Not found', { status: 404 });
}

/**
 * The request handler used by the Angular CLI (dev-server and during build).
 */
export const reqHandler = createRequestHandler(netlifyAppEngineHandler);
