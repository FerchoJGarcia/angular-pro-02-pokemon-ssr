import {
  AngularAppEngine,
  createRequestHandler,
  setAngularAppEngineManifest,
  setAngularAppManifest,
  type AngularAppEngineManifest,
  type AngularAppManifest,
} from '@angular/ssr';
import { getContext } from '@netlify/angular-runtime/context.mjs';

let angularAppEngine: AngularAppEngine | null = null;
let manifestsLoaded = false;

const ensureManifestsLoaded = async () => {
  if (manifestsLoaded) return;

  const [appManifestModule, appEngineManifestModule] = await Promise.all([
    import(new URL('./angular-app-manifest.mjs', import.meta.url).href) as Promise<{
      default: AngularAppManifest;
    }>,
    import(new URL('./angular-app-engine-manifest.mjs', import.meta.url).href) as Promise<{
      default: AngularAppEngineManifest;
    }>,
  ]);

  setAngularAppManifest(appManifestModule.default);
  setAngularAppEngineManifest(appEngineManifestModule.default);
  manifestsLoaded = true;
};

const getAngularAppEngine = async () => {
  if (angularAppEngine) return angularAppEngine;
  await ensureManifestsLoaded();
  angularAppEngine = new AngularAppEngine();
  return angularAppEngine;
};

export async function netlifyAppEngineHandler(request: Request): Promise<Response> {
  const context = getContext();

  // Example API endpoints can be defined here.
  // Uncomment and define endpoints as necessary.
  // const pathname = new URL(request.url).pathname;
  // if (pathname === '/api/hello') {
  //   return Response.json({ message: 'Hello from the API' });
  // }

  const result = await (await getAngularAppEngine()).handle(request, context);
  return result || new Response('Not found', { status: 404 });
}

/**
 * The request handler used by the Angular CLI (dev-server and during build).
 */
export const reqHandler = createRequestHandler(netlifyAppEngineHandler);
