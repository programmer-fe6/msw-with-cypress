import type { FactoryAPI } from '@mswjs/data/lib/glossary'
import { SetupWorkerApi } from 'msw/browser'
import type { RequestHandler } from 'msw'

interface CustomOptions {
  environment: 'development' | 'test'
  db: FactoryAPI<Record<string, any>>
  seeds: () => void
  handlers: () => Array<RequestHandler>
}

export class CustomSetupWorkerApi extends SetupWorkerApi {
  environment: 'development' | 'test'
  db: FactoryAPI<Record<string, any>>

  constructor(options: CustomOptions) {
    super(...options.handlers())
    this.db = options.db
    this.environment = options.environment
    if (this.environment === 'development') {
      options.seeds()
    }
  }
}

export function customSetupWorker(options: CustomOptions): CustomSetupWorkerApi {
  return new CustomSetupWorkerApi(options)
}
