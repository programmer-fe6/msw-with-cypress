import { http, HttpResponse } from 'msw'
import { factory, primaryKey } from '@mswjs/data'
import { faker } from '@faker-js/faker'
import { customSetupWorker } from './CustomSetupWorkerApi'

export const mockServer = ({
  environment = 'development'
}: {
  environment?: 'development' | 'test'
}) => {
  return customSetupWorker({
    environment,
    db: factory({
      user: {
        id: primaryKey(() => faker.string.uuid()),
        name: () => faker.person.fullName(),
        username: () => faker.internet.userName(),
        phoneNumber: () => faker.phone.number(),
        country: () => faker.location.country()
      }
    }),
    seeds() {
      this.db.user.create({
        username: 'user-from-seeds'
      })
    },
    handlers() {
      return [
        http.get('http://dummy.com/api', () => {
          return HttpResponse.json({
            message: 'MSW Rocks!'
          })
        }),
        http.get('http://dummy.com/users', () => {
          const users = this.db.user.getAll()
          return HttpResponse.json({
            users
          })
        })
      ]
    }
  })
}
