import {loginLocators} from "../../fixtures/login";
import {sharedLocators} from "../../fixtures/shared";

const { user } = Cypress.env()
const postcondition = () => {
    cy.logout()
    cy.visit('/user/login')
}

describe('should verify login', () => {
    before(() => {
        cy.visit('/user/login')
    })

    it('Should login with valid credentials', () => {
        cy.get(loginLocators.login).type(user.username)
        cy.get(loginLocators.password).type(user.password)
        cy.get(sharedLocators.buttons.primary).click()
        cy.get(sharedLocators.navBarItem).should('have.length', 4)
        postcondition()
    })

    it('Should not login with invalid login & valid password', () => {
        cy.get(loginLocators.login).type('bus*@ner.com')
        cy.get(loginLocators.password).type(user.password)
        cy.get(sharedLocators.buttons.primary).click()
        cy.get(sharedLocators.popUp).should('be.visible')
    })

    it('Should not login with valid login & invalid password', () => {
        cy.get(loginLocators.login).type(user.username)
        cy.get(loginLocators.password).type('неВерныйПароль!23')
        cy.get(sharedLocators.buttons.primary).click()
        cy.get(sharedLocators.popUp).should('be.visible')    })

    it('Should not login with invalid credentials', () => {
        cy.get(loginLocators.login).type('b!us*@ner.com')
        cy.get(loginLocators.password).type('неВерныйПароль!23')
        cy.get(sharedLocators.buttons.primary).click()
        cy.get(sharedLocators.popUp).should('be.visible')    })

    it('Should not login with mixed credentials', () => {
        cy.get(loginLocators.login).type(user.password)
        cy.get(loginLocators.password).type(user.username)
        cy.get(sharedLocators.buttons.primary).click()
        cy.get(sharedLocators.popUp).should('be.visible')    })
})