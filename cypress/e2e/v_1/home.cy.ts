import {sharedlabels, sharedLocators} from "../../fixtures/shared";
import {homeData, homeLocators} from "../../fixtures/home";
import {loginLabels} from "../../fixtures/login";
import {registerLabels} from "../../fixtures/register";

describe('Layout', () => {
    it('all elements are visible', () => {
        cy.get(sharedLocators.logo).should('contain.text', sharedlabels.logo)
        cy.get(homeLocators.header).should('have.text', homeData.header)
        cy.get(homeLocators.text).should('have.text', homeData.text)
        cy.get(sharedLocators.buttons.login).should('have.text', homeData.login)
        cy.get(sharedLocators.buttons.register).should('have.text', homeData.register)
        cy.get(sharedLocators.buttons.primary).should('have.text', homeData.startNow)
    })
})

describe('Functional', () => {
    it('all buttons are active, clickable and redirects to the corresponding pages', () => {
        cy.get(sharedLocators.buttons.login).click()
        cy.get(sharedLocators.header).should('have.text', loginLabels.header)
        cy.visit('/')
        cy.get(sharedLocators.buttons.register).click()
        cy.get(sharedLocators.header).should('have.text', registerLabels.header)
        cy.visit('/')
        cy.get(sharedLocators.buttons.primary).click()
        cy.get(sharedLocators.header).should('have.text', registerLabels.header)
    })
})