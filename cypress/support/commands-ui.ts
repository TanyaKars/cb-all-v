import {defaultAxeRules} from "./axe-config";

// the best tutorial for this axe configuration https://www.youtube.com/watch?v=TaBhwaOy1XI
const severityIndicators = {
    minor: '⚪',
    moderate: '🟡',
    serious: '🟠',
    critical: '🔴'
}

const callback = (violations) => {
    violations.forEach((violation) => {
        const nodes = Cypress.$(
            violation.nodes.map((node) => node.target).join(',')
        )

        Cypress.log({
            name: `${severityIndicators[violation.impact]} ALLY`,
            consoleProps: () => violation,
            $el: nodes,
            message: `[${violation.help}](${violation.helpUrl})`
        })

        violation.nodes.forEach(({ target }) => {
            Cypress.log({
                name: '🔧',
                consoleProps: () => violation,
                $el: Cypress.$(target.join(',')),
                message: target
            })
        })
    })
}

Cypress.Commands.add('checkPageAlly', () => {
    cy.injectAxe()
    // skipFailures: do not fail the test when there are accessibility failures
    // @ts-expect-error
    cy.checkA11y(null, { rules: defaultAxeRules }, callback, {
        skipFailures: true
    })
})