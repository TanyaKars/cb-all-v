import { defineConfig } from 'cypress'
import globalConfig from './cypress.config'

export default defineConfig({
    ...globalConfig,
    e2e: {
        ...globalConfig.e2e,
        excludeSpecPattern: [
            '**/v_2/*.cy.ts',
            '**/v_3/*.cy.ts',
            '**/v_4/*.cy.ts',
            '**/v_5/*.cy.ts'
        ],
        specPattern: ['**/v_1/*.cy.ts']
    }
})