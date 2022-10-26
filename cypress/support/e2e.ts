import './commands'

// here we can declare before(each) & after(each) globally and not duplicate it in the specs
before(() => {
    cy.clearCookies()
    cy.clearLocalStorage()
})

declare global {
    namespace Cypress {
        interface Chainable {
            /**
             * Custom command to select DOM element by data-cy attribute.
             * @example cy.dataCy('greeting')
             */
            dataCy(value: string): Chainable<Element>
        }
    }
}