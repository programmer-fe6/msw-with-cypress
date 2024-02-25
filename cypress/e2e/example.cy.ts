import { HttpResponse, http } from 'msw'
import { mockServer } from '../../src/mock/server'

describe('MSW Test', () => {
  const server = mockServer({ environment: 'test' })

  before(async () => {
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

  it('should render "MSW Rocks!"', () => {
    cy.get('#data').should('contain.text', 'MSW Rocks!')
  })

  it('should render "Error!" when mock route is overriden with error status', () => {
    server.use(
      http.get('http://dummy.com/api', () => {
        return new HttpResponse(null, { status: 403 })
      })
    )

    cy.get('#data').should('contain.text', 'Error!')
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

    cy.get('#users > tr').should('have.length', 3)
    cy.get('[data-cy="username"]').contains('johndoe').should('exist')
    cy.get('[data-cy="username"]').contains('janedoe').should('exist')
    cy.get('[data-cy="username"]').contains('lewandowski').should('exist')
  })

  it('should not render the previously created users', () => {
    cy.get('#users').should('not.exist')
  })
})
