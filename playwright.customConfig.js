// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = ({

  testDir: './tests',
  timeout: 30 * 1000, //This timeout will be utilized for normal execution of statements. Default timeout is 30 seconds.
  expect: { //This expect timeout will be applied on the assertions

    timeout: 5000,
  },

  reporter: 'html',

  projects: [

    {
      name: "Safari execution config",
      use: {

        browserName: 'webkit', //chromium, firefox, and webkit
        headless: true,
        //this will take screenshot for all the actions throughout the script.
        screenshot: 'on', //it can be off, on, retain-on-failure
        //this will trace each action and generate logs for further debugging
        trace: 'on', //it can be off, on, retain-on-failure
        ...devices['iPhone 11']

      }
    },

    {
      name: "Chrome execution config",
      use: {

        browserName: 'chromium', //chromium, firefox, and webkit
        headless: false,
        //this will take screenshot for all the actions throughout the script.
        screenshot: 'off', //it can be off, on, retain-on-failure
        //this will trace each action and generate logs for further debugging
        trace: 'off', //it can be off, on, retain-on-failure
        ignoreHttpsErrors: true, //This will bypass SSL certificates without validation.
        permissions:['geolocation'],
        //viewport: { width: 1000, height: 1000 }, //for customized dimensions
        ...devices['Galaxy S24'],
      }
    }
  ],

});

module.exports = config