import './commands-ui'
import './commands-api'
import 'cypress-axe'


Cypress.on('uncaught:exception', (_err, _runnable) => {
    // returning false here prevents Cypress from failing the test
    return false
})

// here we can declare before(each) & after(each) globally and not duplicate it in the specs
before(() => {
    cy.clearCookies()
    cy.clearLocalStorage()
})

declare global {
    namespace Cypress {
        interface Chainable {
            addBoard: Chainable<Element>
            checkPageAlly: () => Cypress.Chainable<void>
        }
    }
}