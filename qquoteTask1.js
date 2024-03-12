const {Builder, Browser, By, Key, until} = require('selenium-webdriver');

(async function example() {
  let driver = await new Builder().forBrowser(Browser.EDGE).build();
  try {
    await driver.navigate().to('https://dev.qquote.com/login');
    await driver.sleep(5000)
    await driver.manage().window().maximize();
    const email = await driver.findElement(By.css("input[name='email']"))
    await driver.actions().sendKeys(email,"testermashkraft@gmail.com").perform()
    await driver.sleep(2000)
    const pass = await driver.findElement(By.css("input[name='password']"))
    await driver.actions().sendKeys(pass,"12345678").perform()
    await driver.sleep(2000)
    const loginButton = await driver.findElement(By.id("submit"))
    await driver.actions().click(loginButton).perform()
    await driver.sleep(4000)
    const clickModule = await driver.findElement(By.css("img[src='./assets/assets/dist/images/multi_tyres_icon.png']"))
    await driver.actions().click(clickModule).perform()
    await driver.sleep(6000)
    let selectElement = await driver.findElement(By.id("select2-make-container"));
    await selectElement.click(); 
    await driver.sleep(5000);
    let searchEle= await driver.findElement(By.css("input[class='select2-search__field']"))
    await searchEle.sendKeys("BMW", Key.ENTER)
    // let objectt= await selectElement.findElement(By.css("#select2-make-result-lvwx-8421"))
    // await objectt.click();
    await driver.sleep(6000);
  } finally {
    await driver.quit();
  }
})();