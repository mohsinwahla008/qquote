const { Builder, Browser, By, Key, until } = require('selenium-webdriver');
//Winter Wheels and Tires Packages Module Task 1
async function solvingCaptcha(driver) {
    await driver.navigate().to('https://www.google.com/recaptcha/api2/demo');
    await driver.manage().window().maximize();
    await driver.sleep(20000);
    let loginButton = await driver.findElement(By.css("#recaptcha-demo-submit"));
    await loginButton.click();
}
(async function example() {
    let driver = await new Builder().forBrowser(Browser.CHROME).build();
    try {
        // Login
        await solvingCaptcha(driver);

    } finally {
        await driver.quit();
    }
})();
