import { faker } from '@faker-js/faker'
import { http, HttpResponse } from 'msw'
import { factory, primaryKey } from '@mswjs/data'
import type { PrimaryKey } from '@mswjs/data/lib/primaryKey'
import { mockServer, type ServerEnvironment } from './MockServer'

type UserSchema = {
  id: PrimaryKey<string>
  name: string
  username: string
  phoneNumber: string
  country: string
}

export type DBSchema = {
  user: UserSchema
}

/**
 *
 * @param options.environment {'development' | 'test'} Define the environment of this server.
 *
 * If the environment is set to 'test', the server won't call the seeds function.
 *
 */
export const createServer = ({
  environment = 'development'
}: {
  environment?: ServerEnvironment
}) => {
  /**
   * Add type annotation of the database schema by passing it as parameter type of the function.
   */
  return mockServer<DBSchema>({
    environment,
    db: factory({
      /**
       * @example
       * user: {
       *   id: primaryKey(faker.string.uuid),
       *   name: () => faker.person.fullName(),
       *   username: () => faker.internet.userName(),
       *   phoneNumber: () => faker.phone.number(),
       *   country: () => faker.location.country()
       * }
       */

      // Factories can go here...
      user: {
        id: primaryKey(faker.string.uuid),
        name: () => faker.person.fullName(),
        username: () => faker.internet.userName(),
        phoneNumber: () => faker.phone.number(),
        country: () => faker.location.country()
      }
    }),
    seeds() {
      /**
       * @example
       * this.db.user.create({data})
       */

      // Seeds can go here...
      this.db.user.create({
        username: 'user-from-seeds'
      })

      // Or seeds random data for a specified amount of times.
      for (let i = 0; i < 100; i++) {
        this.db.user.create()
      }
    },
    handlers() {
      return [
        /**
         * @example
         * http.get({url}, ({ request, params, cookies })) {
         *  return HttpResponse
         * }
         */

        // Request handlers go here...
        http.get('https://dummy.com/users', ({ request, params, cookies }) => {
          const users = this.db.user.getAll()

          return HttpResponse.json({ users })
        })
      ]
    }
  })
}
