// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = ({
  
  testDir: './tests',
  timeout: 30 * 1000, //This timeout will be utilized for normal execution of statements. Default timeout is 30 seconds.
  expect:{ //This expect timeout will be applied on the assertions

    timeout: 5000,
  },

  reporter: 'html',
  use: {

    browserName: 'chromium', //chromium, firefox, and webkit
    headless : false,
    //this will take screenshot for all the actions throughout the script.
    screenshot : 'retain-on-failure', //it can be off, on, retain-on-failure
    //this will trace each action and generate logs for further debugging
    trace: 'retain-on-failure' //it can be off, on, retain-on-failure

  },

});

module.exports = config