// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = ({

  testDir: './tests',
  timeout: 30 * 1000, //This timeout will be utilized for normal execution of statements. Default timeout is 30 seconds.
  retries: 1, //This will retry the execution of test case if it is failed on the first attempt.
  workers: 5, //This option will be utilized to run test files in a parallel mode.
  expect: { //This expect timeout will be applied on the assertions

    timeout: 5000,
  },

  reporter: 'html',

  projects: [

    {
      name: "Safari execution config",
      use: {

        browserName: 'webkit', //chromium, firefox, and webkit
        headless: false,
        //this will take screenshot for all the actions throughout the script.
        screenshot: 'on', //it can be off, on, retain-on-failure
        //this will trace each action and generate logs for further debugging
        trace: 'on', //it can be off, on, retain-on-failure
        //...devices['iPhone 11']

      }
    },

    {
      name: "Chrome execution config",
      use: {

        browserName: 'chromium', //chromium, firefox, and webkit
        headless: true,
        //this will take screenshot for all the actions throughout the script.
        screenshot: 'off', //it can be off, on, retain-on-failure
        //this will trace each action and generate logs for further debugging
        trace: 'off', //it can be off, on, retain-on-failure
        video: 'retain-on-failure', //on, off,
        ignoreHttpsErrors: true, //This will bypass SSL certificates without validation.
        permissions:['geolocation'], //bypass location pop-up
        //viewport: { width: 1000, height: 1000 }, //for customized dimensions
        //...devices['Galaxy S24'], //test will fail as the web app is not user freindly for Glaxy S24
      }
    }
  ],

});

module.exports = config