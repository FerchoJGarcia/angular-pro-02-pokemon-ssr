import {
  AngularAppEngine,
  createRequestHandler,
  \u0275setAngularAppEngineManifest as setAngularAppEngineManifest,
  \u0275setAngularAppManifest as setAngularAppManifest,
} from '@angular/ssr';
import { getContext } from '@netlify/angular-runtime/context.mjs';

const angularAppEnginePromise = (async () => {
  const [appManifestModule, appEngineManifestModule] = await Promise.all([
    import(new URL('./angular-app-manifest.mjs', import.meta.url).href),
    import(new URL('./angular-app-engine-manifest.mjs', import.meta.url).href),
  ]);

  setAngularAppManifest(appManifestModule.default);
  setAngularAppEngineManifest(appEngineManifestModule.default);

  return new AngularAppEngine();
})();

export async function netlifyAppEngineHandler(request: Request): Promise<Response> {
  const context = getContext();

  // Example API endpoints can be defined here.
  // Uncomment and define endpoints as necessary.
  // const pathname = new URL(request.url).pathname;
  // if (pathname === '/api/hello') {
  //   return Response.json({ message: 'Hello from the API' });
  // }

  const angularAppEngine = await angularAppEnginePromise;
  const result = await angularAppEngine.handle(request, context);
  return result || new Response('Not found', { status: 404 });
}

/**
 * The request handler used by the Angular CLI (dev-server and during build).
 */
export const reqHandler = createRequestHandler(netlifyAppEngineHandler);
