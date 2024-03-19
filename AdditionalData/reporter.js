const {Builder, Browser, By, Key, until} = require('selenium-webdriver');

(async function example() {
  let driver = await new Builder().forBrowser(Browser.EDGE).build();
  try {
    await driver.navigate().to('http://68.183.120.171/qquotemailer_laravel/public/qquotemailer');
    await driver.sleep(7000)
    const email = await driver.findElement(By.id("userEmail"))
    
    await driver.actions().sendKeys(email,"testadmin123@gmail.com").perform()
    await driver.sleep(4000)
    const pass = await driver.findElement(By.id("userPassword"))
    await driver.actions().sendKeys(pass,"test123").perform()
    await driver.sleep(4000)
    const loginButton = await driver.findElement(By.id("submit"))
    await driver.actions().click(loginButton).perform()
    await driver.sleep(5000)
    
  } finally {
    await driver.quit();
  }
})();