import { SetupWorkerApi } from 'msw/browser'
import type { RequestHandler } from 'msw'
import type { FactoryAPI } from '@mswjs/data/lib/glossary'

export type ServerEnvironment = 'development' | 'test'

interface ServerOptions<Schema extends Record<string, any>> {
  environment: ServerEnvironment
  db: FactoryAPI<Schema>
  seeds: () => void
  handlers: () => Array<RequestHandler>
}

export class CustomSetupWorkerApi<Schema extends Record<string, any>> extends SetupWorkerApi {
  environment: ServerEnvironment
  db: FactoryAPI<Schema>

  constructor(options: ServerOptions<Schema>) {
    super(...options.handlers())
    this.db = options.db
    this.environment = options.environment
    if (this.environment === 'development') {
      options.seeds()
    }
  }
}

/**
 * Create the mock server
 * 
 * @param options {ServerOptions<Schema>} options for the server.
 * @returns {CustomSetupWorkerApi<Schema>}
 */
export function mockServer<Schema extends Record<string, any>>(
  options: ServerOptions<Schema>
): CustomSetupWorkerApi<Schema> {
  return new CustomSetupWorkerApi(options)
}

