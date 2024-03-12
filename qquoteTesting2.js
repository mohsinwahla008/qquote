const { Builder, Browser, By, Key, until } = require('selenium-webdriver');
//Winter Tires Module Task 2


async function login(driver) {
    await driver.navigate().to('https://dev.qquote.com/login');
    // await driver.manage().window().maximize();
    await driver.manage().window().setSize(1280,720)
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
    //Winter Tire Module
    const clickModule = await driver.findElement(By.css("img[src='./assets/assets/dist/images/single_tyre_icon.png']"));
    await driver.actions().click(clickModule).perform();
    await driver.sleep(6000);
}

async function SearchTireBySize(driver){
    const searchTireButton  = await driver.findElement(By.css("input[id='tire_size']"));
    await searchTireButton.sendKeys("215/55/17");
    await driver.sleep(4000);
    let submitQuote= await driver.findElement(By.id("submit_btn"));
    await submitQuote.click();
    await driver.sleep(6000);
}

async function markAvailablity(driver){
    const availRadioButton = await driver.findElement(By.xpath("//label[normalize-space()='Availability']"));
    await availRadioButton.click();
    await driver.sleep(3000)
    // await availRadioButton.sendKeys(Key.PAGE_DOWN)
}
async function searchTireInput(driver){
    const searchTire = await driver.findElement(By.css("input[id='search_term']"));
    await searchTire.sendKeys("Observe GSi-6 HP",Key.ENTER)
    await searchTire.sendKeys(Key.PAGE_DOWN)
    await driver.sleep(5000)
    const imgHover = await driver.findElement(By.xpath("//div[@class='slick-slide slick-current slick-active']//img[@class='img-responsive center-block s_tooltip']"))
    await imgHover.click();
    await driver.sleep(4000)
    const exitImgHover = await driver.findElement(By.css("a[class='h_tootip']"));
    await exitImgHover.click();
    await driver.sleep(4000)
    const priceCheck2 = await driver.findElement(By.css("span[class='optcheck'] ins[class='iCheck-helper']"));
    await priceCheck2.click();
    await driver.sleep(5000)
}
async function priceCheckBox1(driver){
    //Click the Quote Details
    const quoteDetailButton = await driver.findElement(By.css("button[class='btn btn-default quotedetailsbtn']"));
    await quoteDetailButton.click()
    await driver.sleep(7000)
    //Clicking Quoter comment to scroll Down. 
    const scrollDown = await driver.findElement(By.css("textarea[name='comment_msg']"));
    for(let i=1; i<=1; i++){
        await scrollDown.sendKeys(Key.PAGE_DOWN);
        await driver.sleep(4000)
    }
    const quantity = await driver.findElement(By.css("input[id='quantity']"));
    await quantity.sendKeys(Key.CONTROL, "a");
    await quantity.sendKeys(Key.BACK_SPACE);
    await driver.sleep(4000);
    await quantity.sendKeys("6");
    await quantity.sendKeys(Key.PAGE_DOWN);
    await driver.sleep(4000)
}
async function defaultServicesAndAddOns(driver) {
    // Add and Remove Services/Goods 
    // const removeServices = await driver.findElement(By.css("button[onclick='removeServices(0,0);']"));
    // await removeServices.click();
    // await driver.sleep(3000);
    //Add Services and then remove 
    const addServices = await driver.findElement(By.xpath("(//button[@type='button'])[14]"));
    await addServices.click();
    await driver.sleep(3000);
    const serviceDropdown = await driver.findElement(By.xpath("//option[@value='services']"));
    await serviceDropdown.click();
    await driver.sleep(3000);
    //input default services
    let inputServices = await driver.findElement(By.css("input[name='name[4][0]']"));
    await inputServices.sendKeys("Testing2(services)");
    await driver.sleep(3000);
    //Input Price Services
    let inputPrice = await driver.findElement(By.css("input[name='price[4][0]']"));
    await inputPrice.sendKeys("121.05");
    await driver.sleep(3000)

    // Changing Values of Testing(Services)
    const changeSerVal = await driver.findElement(By.css("input[name='price[3][0]']"));
    await changeSerVal.sendKeys(Key.CONTROL, "a");
    await driver.sleep(3000);
    await changeSerVal.sendKeys(Key.BACK_SPACE, "54.00");
    //Additional Shoppers Adding 
    const addShopper = await driver.findElement(By.css("div[id='service-rows0'] div button[type='button']"));
    await addShopper.click()
    await driver.sleep(2000)
    await addShopper.sendKeys(Key.PAGE_DOWN);
    await driver.sleep(3000)
    for (i=0; i<=4; i++){
        await addShopper.sendKeys(Key.PAGE_UP);
        await driver.sleep(1000);
    }
    //Clicking Verbal Button
    const verbalButtonClick = await driver.findElement(By.xpath("//button[normalize-space()='Verbal']"));
    await verbalButtonClick.click();
    await driver.sleep(4000);
}
async function verbalQuotePopup1(driver) {
    //First Name
    const firstNameVQ = await driver.findElement(By.id("fname"));
    await firstNameVQ.sendKeys("testing")
    await driver.sleep(3000)
    //Last Name
    const lastNameVQ = await driver.findElement(By.id("lname"));
    await lastNameVQ.sendKeys("quote")
    await driver.sleep(3000)
    //Email
    const emailVQ = await driver.findElement(By.id("to_email"));
    await emailVQ.sendKeys("mashkraftautomation@gmail.com");
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
        // Search Tire size
        await SearchTireBySize(driver);
        //Mark Availability
        await markAvailablity(driver);
        //Search Distributor
        await searchTireInput(driver);
        // mark the Chechbox
        await priceCheckBox1(driver);
        
        // await verbalQuotePopup(driver);
        await defaultServicesAndAddOns(driver);
        //saving the Verbal Quote
        await verbalQuotePopup1(driver);
    } finally {
        console.log("Script is completed, Have a Good Day. ");
        // await driver.quit();
    }
})();
