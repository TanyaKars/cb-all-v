import {loginLocators} from "../../fixtures/login";
import {sharedLocators} from "../../fixtures/shared";

const { user } = Cypress.env()

const postcondition = () => {
    cy.logout()
    cy.visit('/user/login')
}
let token

describe('should verify login', () => {
    beforeEach(() => {
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
        cy.get(sharedLocators.popUp).should('be.visible')
    })

    it('Should not login with invalid credentials', () => {
        cy.get(loginLocators.login).type('b!us*@ner.com')
        cy.get(loginLocators.password).type('неВерныйПароль!23')
        cy.get(sharedLocators.buttons.primary).click()
        cy.get(sharedLocators.popUp).should('be.visible')
    })

    it('Should not login with mixed credentials', () => {
        cy.get(loginLocators.login).type(user.password)
        cy.get(loginLocators.password).type(user.username)
        cy.get(sharedLocators.buttons.primary).should('be.disabled')
        cy.get(sharedLocators.error).should('be.visible')
    })
})

describe('Should verify client', () => {
    before(() => {
        cy.visit('/user/login')
        cy.login(user.username, user.password)
        cy.getToken().then((access_token) => {
            token = access_token
        })
    })

    it('test', () => {
        cy.get(sharedLocators.buttons.primary)
    })
})