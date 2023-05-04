import {loginLocators} from "../../fixtures/login";
import {sharedLocators} from "../../fixtures/shared";
import {clientData, clientLocators} from "../../fixtures/client";

const { user } = Cypress.env()

const postcondition = () => {
    cy.logout()
    cy.visit('/user/login')
}
let token
let clientId

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
        cy.get(sharedLocators.error).should('be.')
    })
})

describe.only('Should verify client', () => {
    before(() => {
        cy.visit('/user/login')
        cy.login(user.username, user.password)
        cy.getToken().then((access_token) => {
            token = access_token
        })
    })

    it('User should be able to create client', () => {
        cy.wait(500)
        cy.get(sharedLocators.buttons.primary).click()
        cy.get(clientLocators.fields.Name).type(clientData.name)
        cy.get(clientLocators.fields.Phone).type(clientData.phone)
        cy.intercept('POST','**/client').as('postClient')
        cy.get(sharedLocators.drawerForm)
            .find(sharedLocators.buttons.primary)
            .click({ force: true })
        cy.wait('@postClient').then((res) => {
            cy.contains(clientData.name).should('be.visible')
            clientId =  res.response.body.payload
            cy.get(`[data-row-key="${clientId}"]`)
                .find(sharedLocators.tableCell).eq(0)
                .should("contain.text", clientData.name)
            cy.get(`[data-row-key="${clientId}"]`)
                .find(sharedLocators.tableCell).eq(1)
                .and("contain.text", clientData.phone)
        })
    })

    it('User should be able to edit client', () => {
        cy.get(sharedLocators.tableRow)
            .contains(clientData.name)
            .parent(sharedLocators.td)
            .siblings(sharedLocators.actions)
            .find(sharedLocators.penIcon)
            .click()
        cy.get(clientLocators.fields.Email).type(clientData.email)
        cy.get(clientLocators.fields.Notes).type(clientData.notes)
        cy.get(sharedLocators.drawerForm)
            .find(sharedLocators.buttons.primary)
            .click({ force: true })
        cy.get(sharedLocators.tableRow)
            .contains(clientData.name)
            .parent(sharedLocators.td)
            .siblings()
            .should("contain.text", clientData.email)
            .and("contain.text", clientData.notes)
    })

    it('User should be able to delete client', () => {
        cy.get(sharedLocators.tableRow)
            .contains(clientData.name)
            .parent(sharedLocators.td)
            .siblings(sharedLocators.actions)
            .find(sharedLocators.editDeletTrigger)
            .click()
        cy.get(sharedLocators.deleteOption).click()
        cy.get(sharedLocators.deleteModal.okButton).click()
        cy.wait(500)
        cy.get(sharedLocators.tableRow)
            .first()
            .should("not.contain.text", clientData.name)
    })
})