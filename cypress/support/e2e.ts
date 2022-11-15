import './commands-ui'
import './commands-api'
import './commands-localStorage'
import 'cypress-axe'

Cypress.on('uncaught:exception', (_err, _runnable) => {
    // returning false here prevents Cypress from failing the test
    return false
})

// here we can declare before(each) & after(each) globally and not duplicate it in the specs
before(() => {
    cy.clearLocalStorage()
    cy.visit('/')
})

beforeEach(() => {
    cy.restoreLocalStorage()
})

afterEach(() => {
    cy.saveLocalStorage()
})

declare global {
    namespace Cypress {
        interface Chainable {
            addBoard: Chainable<Element>
            checkPageAlly: () => Cypress.Chainable<void>
            logout: () => Cypress.Chainable<void>
            login: (username, Password) => Cypress.Chainable<void>
            loginAPI: (username, Password, loginUrl) => Cypress.Chainable<void>
            getToken: () => Cypress.Chainable<any>
            saveLocalStorage: () => Cypress.Chainable<any>
            restoreLocalStorage: () => Cypress.Chainable<any>
        }
    }
}