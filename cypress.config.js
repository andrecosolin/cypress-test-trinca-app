import { defineConfig } from 'cypress'
import allureWritter from '@shelex/cypress-allure-plugin/writer.js'

export default defineConfig({
  viewportWidth: 1280,
  viewportHeight: 720,
  chromeWebSecurity: false,
  retries: {
    runMode: 1,
    openMode: 0,
  },
  defaultCommandTimeout: 10000,
  video: false,
  e2e: {
    setupNodeEvents(on, config) {
      allureWritter(on, config)
      return config
    },
    experimentalRunAllSpecs: true,
    baseUrl: 'https://trinca-app-bbq.vercel.app',
    allure:true,
    env: {
      screenshotOnRunFailure: true
    }
  },
})
