// not working
Cypress.Commands.add('loginAPI', (username, Password, loginUrl) => {
    cy.task('log', `login via api - ${username}`)
    cy.request({
        method: 'POST',
        url: loginUrl,
        body: {
            email: username,
            password: Password
        }
    }).as('loginAPI')
    cy.get('@loginAPI')
        .its('status')
        .should('be.oneOf', [200, 202, 204])
})

Cypress.Commands.add('getToken', () => {
    cy.task('log', 'get token')
    cy.intercept('GET', '**/user/auth').as('getTokenApi')
    return cy
        .wait('@getTokenApi')
        .its('request.headers.authorization')
        .then((access_token) => access_token)
})
