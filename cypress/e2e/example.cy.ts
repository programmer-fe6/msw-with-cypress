import { createServer, type DBSchema } from '../../src/mock/server'
import { CustomSetupWorkerApi } from '../../src/mock/MockServer'

describe('MSW Test', () => {
  let server: CustomSetupWorkerApi<DBSchema>

  before(async () => {
    server = createServer({ environment: 'test' })
    await server.start()
  })

  after(() => {
    server.stop()
  })

  beforeEach(() => {
    cy.visit('/')
  })

  afterEach(() => {
    server.resetHandlers()
  })

  it('should render the newly created users', () => {
    server.db.user.create({
      username: 'johndoe'
    })
    server.db.user.create({
      username: 'janedoe'
    })
    server.db.user.create({
      username: 'lewandowski'
    })

    cy.get('tbody > tr').should('have.length', 3)
  })

  it('should not render the previously created users', () => {
    cy.get('tbody > tr').should('not.exist')
  })
})
