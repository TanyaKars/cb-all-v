import { defineConfig } from 'cypress'
import { config } from 'dotenv'

config()

function getConfigurationByFile(file: string) {
  return require(`../e2e/cypress/config/${file}.ts`)
}

export default defineConfig({
  viewportHeight: 1500,
  viewportWidth: 1200,
  video: false,
  retries: {
    runMode: 3,
    openMode: 0
  },
  chromeWebSecurity: false,
  watchForFileChanges: false,
  e2e: {
    experimentalStudio: true,
    env: {
      devtools: true
    },
    setupNodeEvents(on, config) {

      console.log('Using cypress configFile:', config.configFile)
      const envFile = config.env.configFile
      console.log('Using environment configFile:', envFile)
      const envConfig = { ...getConfigurationByFile(envFile).default }
      console.log(
          'envConfig: ',
          JSON.stringify(
              envConfig,
              (key, value) => {
                const KEYS_TO_IGNORE = ['password']
                if (KEYS_TO_IGNORE.includes(key)) {
                  const splitter = value.split('')
                  return `${splitter[0]}***${splitter[splitter.length - 1]}`
                }
                return value
              },
              2
          )
      )

      const finalConfig = {
        ...config,
        ...envConfig
      }

      on('task', {
        log(message) {
          console.log(message)
          return null
        }
      })

      on('before:browser:launch', (browser: Cypress.Browser, launchOptions) => {
        if (config.env?.devtools) {
          if (browser.family === 'chromium' && browser.name !== 'electron') {
            launchOptions.args.push('--auto-open-devtools-for-tabs')
          }
          if (browser.family === 'firefox') {
            launchOptions.args.push('-devtools')
          }
          if (browser.name === 'electron') {
            launchOptions.preferences.devTools = true
          }
        }
        return launchOptions
      })
      return finalConfig
    }
  }
})
