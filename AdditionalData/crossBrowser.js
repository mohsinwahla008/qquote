const { Builder, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const firefox = require('selenium-webdriver/firefox');

// Function to create a Chrome WebDriver instance
async function getChromeDriver() {
  let options = new chrome.Options();
  // Add any additional Chrome options as needed
  options.addArguments('--start-maximized');

  return new Builder()
    .forBrowser('chrome')
    .setChromeOptions(options)
    .build();
}

// Function to create a Firefox WebDriver instance
async function getFirefoxDriver() {
  let options = new firefox.Options();
  // Add any additional Firefox options as needed
  options.addArguments('--start-maximized');

  return new Builder()
    .forBrowser('firefox')
    .setFirefoxOptions(options)
    .build();
}

// Example test scenario
async function runTest() {
  let chromeDriver = await getChromeDriver();
  let firefoxDriver = await getFirefoxDriver();

  try {
    // Open the website in Chrome
    await chromeDriver.get('https://google.com');
    console.log('Opened in Chrome');

    // Open the website in Firefox
    await firefoxDriver.get('https://google.com');
    console.log('Opened in Firefox');

    // Example: Perform actions on the page using Chrome
    await chromeDriver.findElement(By.name('q')).sendKeys('Selenium', Key.RETURN);
    console.log('Performed search in Chrome');

    // Example: Perform actions on the page using Firefox
    await firefoxDriver.findElement(By.name('q')).sendKeys('Selenium', Key.RETURN);
    console.log('Performed search in Firefox');

    // Wait for some element using Chrome
    await chromeDriver.wait(until.elementLocated(By.id('some-element')), 5000);
    console.log('Found element in Chrome');

    // Wait for some element using Firefox
    await firefoxDriver.wait(until.elementLocated(By.id('some-element')), 5000);
    console.log('Found element in Firefox');
  } finally {
    // Close the browsers
    await chromeDriver.quit();
    await firefoxDriver.quit();
  }
}

// Run the example test scenario
runTest();
