const { Builder, By, Key, until, Actions } = require('selenium-webdriver');

(async function example() {
  // Create a new WebDriver instance
  let driver = await new Builder().forBrowser('chrome').build();
  
  try {
    // Navigate to the desired webpage
    await driver.get('https://demo.automationtesting.in/Register.html');

    // Find the element from which you want to get the text
    let elementID = await driver.findElement(By.css("body > section:nth-child(2) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > form:nth-child(1) > div:nth-child(2) > label:nth-child(1)"));
    // Wait for the element to be clickable
    await driver.wait(until.elementIsVisible(elementID), 10000);
    await driver.actions({bridge: true}).doubleClick(elementID).sendKeys(Key.CONTROL,'c').perform();
    await driver.sleep(5000)
    
    console.log("Double Click is performed. ");
    let inputField = await driver.findElement(By.css(".form-control.ng-pristine.ng-untouched.ng-valid[rows='3']"))
    await inputField.sendKeys(Key.CONTROL,"v");
    await driver.sleep(5000)

  } catch (error) {
    console.error('Error:', error);
  } finally {
    // Close the WebDriver session
    await driver.quit();
  }
})();
