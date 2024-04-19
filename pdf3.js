const { Builder, Browser, By, Key, until } = require('selenium-webdriver');
const { Workbook } = require('exceljs');
const path = require('path');

//Winter Wheels and Tires Packages Module Task 1
async function login(driver) {
    await driver.manage().setTimeouts({ implicit: 5000 });

    await driver.navigate().to('https://dev.qquote.com/login');
    await driver.manage().window().maximize();
    
    

    const emailInput = await driver.findElement(By.css("input[name='email']"));
    await driver.actions().sendKeys(emailInput, "testermashkraft@gmail.com").perform();
    

    const passwordInput = await driver.findElement(By.css("input[name='password']"));
    await driver.actions().sendKeys(passwordInput, "12345678").perform();
    

    const loginButton = await driver.findElement(By.id("submit"));
    await driver.actions().click(loginButton).perform();
    
    const clickModule = await driver.findElement(By.css("img[src='./assets/assets/dist/images/multi_tyres_icon.png']"));
    await driver.actions().click(clickModule).perform();
    
    await driver.manage().setTimeouts({ implicit: 0 });
}
(async function example() {
    let driver = await new Builder().forBrowser(Browser.CHROME).build();
    try {
        // Login
        await login(driver);

    } finally {
        await driver.quit();
    }
})();