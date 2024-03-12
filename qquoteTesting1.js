const { Builder, Browser, By, Key, until } = require('selenium-webdriver');
//Winter Wheels and Tires Packages Module Task 1
async function login(driver) {
    await driver.navigate().to('https://dev.qquote.com/login');
    await driver.manage().window().maximize();
    await driver.sleep(5000);
    

    const emailInput = await driver.findElement(By.css("input[name='email']"));
    await driver.actions().sendKeys(emailInput, "testermashkraft@gmail.com").perform();
    await driver.sleep(2000);

    const passwordInput = await driver.findElement(By.css("input[name='password']"));
    await driver.actions().sendKeys(passwordInput, "12345678").perform();
    await driver.sleep(2000);

    const loginButton = await driver.findElement(By.id("submit"));
    await driver.actions().click(loginButton).perform();
    await driver.sleep(4000);
    const clickModule = await driver.findElement(By.css("img[src='./assets/assets/dist/images/multi_tyres_icon.png']"));
    await driver.actions().click(clickModule).perform();
    await driver.sleep(6000);
}

async function selectOptionFromDropdown(driver) {
    let selectElement = await driver.findElement(By.id("select2-make-container"));
    await selectElement.click();
    await driver.sleep(5000);

    let searchEle = await driver.findElement(By.css("input[class='select2-search__field']"));
    await searchEle.sendKeys("BMW", Key.ENTER);
    await driver.sleep(4000);
}
async function selectModelFromDropDown(driver) {
    let selectModel = await driver.findElement(By.css("body > div:nth-child(10) > div:nth-child(1) > form:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > span:nth-child(2) > span:nth-child(1) > span:nth-child(1)"));
    await selectModel.click();
    await driver.sleep(4000)
    let searchModal = await driver.findElement(By.css("input[class='select2-search__field']"));
    await searchModal.sendKeys("M5", Key.ENTER);
    await driver.sleep(4000)
}
async function selectYearFromDropDown(driver) {
    let selectYear = await driver.findElement(By.css("#select2-year_id-container"));
    await selectYear.click();
    await driver.sleep(4000)
    let yearDropdown = await driver.findElement(By.css("option[value='2014']"));
    await yearDropdown.click();
    await driver.sleep(2000)
    await selectYear.click();
    await driver.sleep(4000)
}
async function submitQuoteButton(driver) {
    let submitQuote= await driver.findElement(By.id("submit_btn"));
    await submitQuote.click();
    await driver.sleep(6000);
}
async function priceCheckBox(driver){
    const scrollEleDown= await driver.findElement(By.xpath("//input[@id='search_term']"));
    await scrollEleDown.sendKeys(Key.PAGE_DOWN)
    await driver.sleep(4000)
    const priceCheck = await driver.findElement(By.css("div[class='icheckbox_square-blue'] ins[class='iCheck-helper']"));
    await priceCheck.click();
    await driver.sleep(4000)
    const scrollEleTop= await driver.findElement(By.xpath("//input[@id='search_term']"));
    await scrollEleTop.sendKeys(Key.PAGE_UP)
    await driver.sleep(3000)
    
    //Click the Quote Details
    const quoteDetailButton = await driver.findElement(By.css("button[class='btn btn-default quotedetailsbtn']"));
    await quoteDetailButton.click()
    await driver.sleep(7000)
    //Saving the Quote Verbally
    
    const saveVerbalButton = await driver.findElement(By.id("submit_btn_save"));
    await saveVerbalButton.click();
    await driver.sleep(8000);
}
async function verbalQuotePopup(driver) {
    //First Name
    const firstNameVQ = await driver.findElement(By.id("fname"));
    await firstNameVQ.sendKeys("MT")
    await driver.sleep(3000)
    //Last Name
    const lastNameVQ = await driver.findElement(By.id("lname"));
    await lastNameVQ.sendKeys("sqa")
    await driver.sleep(3000)
    //Email
    const emailVQ = await driver.findElement(By.id("to_email"));
    await emailVQ.sendKeys("mashkraftsqa@gmail.com");
    await driver.sleep(3000)
    //Phone Number
    const phoneNumberVQ = await driver.findElement(By.id("phone"));
    await phoneNumberVQ.sendKeys("1111111111");
    await driver.sleep(4000)
    //Save(Verbal) Quote
    const saveQuoteButton = await driver.findElement(By.xpath("//div[@class='pull-right']//button[@id='submit_btn']"));
    await saveQuoteButton.click();
    await driver.sleep(12000)
}
(async function example() {
    let driver = await new Builder().forBrowser(Browser.EDGE).build();
    try {
        // Login
        await login(driver);

        // Select Car from Dropdown
        await selectOptionFromDropdown(driver);
        // Select Model of That Car 
        await selectModelFromDropDown(driver);
        //Select Model Year
        await selectYearFromDropDown(driver);
        //submit Button
        await submitQuoteButton(driver);
        // mark the Chechbox
        await priceCheckBox(driver);
        //saving the Verbal Quote
        await verbalQuotePopup(driver);

    } finally {
        await driver.quit();
    }
})();
