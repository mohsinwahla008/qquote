const { Builder, Browser, By, Key, until, Actions } = require('selenium-webdriver');
//Winter Tires Module Task 2

const Green = "\u001b[32m";
const Red = "\u001b[31m";
async function login(driver) {
    await driver.navigate().to('https://dev.qquote.com/login');
    // await driver.manage().window().maximize();
    await driver.manage().window().setSize(1280,720)
    await driver.manage().window().maximize();
    await driver.sleep(3000);
    

    const emailInput = await driver.findElement(By.css("input[name='email']"));
    await driver.actions().sendKeys(emailInput, "testermashkraft@gmail.com").perform();
    await driver.sleep(1000);

    const passwordInput = await driver.findElement(By.css("input[name='password']"));
    await driver.actions().sendKeys(passwordInput, "12345678").perform();
    await driver.sleep(1000);

    const loginButton = await driver.findElement(By.id("submit"));
    await driver.actions().click(loginButton).perform();
    await driver.sleep(4000);
    //Winter Tire Module
    const clickModule = await driver.findElement(By.css("img[src='./assets/assets/dist/images/single_tyre_icon.png']"));
    await driver.actions().click(clickModule).perform();
    await driver.sleep(4000);
}

async function SearchTireBySize(driver){
    const searchTireButton  = await driver.findElement(By.css("input[id='tire_size']"));
    await searchTireButton.sendKeys("265/70R17");
    await driver.sleep(3000);
    let submitQuote= await driver.findElement(By.id("submit_btn"));
    await submitQuote.click();
    await driver.sleep(3000);
}

async function markAvailablity(driver){
    const availRadioButton = await driver.findElement(By.xpath("//label[normalize-space()='Availability']"));
    await availRadioButton.click();
    await driver.sleep(3000)
    //Setting the Quantity 
    let priceQuantity = await driver.findElement(By.xpath("//input[@id='quantity']"));
    priceQuantity.sendKeys(Key.CONTROL, "a");
    priceQuantity.sendKeys(Key.BACK_SPACE,"2");
    await driver.sleep(3000)
    //Clicking on any element to change the price after changing the quantity
    await driver.findElement(By.css("body")).click();
    await driver.sleep(3000)
    //Clicking on expandable toggle 
    let expandableToggle = await driver.findElement(By.xpath("//a[@id='expandablebranch']"));
    // Scroll to the toggle button
    await driver.executeScript('arguments[0].scrollIntoView(true);', expandableToggle);

    // Click on the toggle button using JavaScript
    await driver.executeScript('arguments[0].click();', expandableToggle);
    await driver.sleep(3000)
}
async function priceComparison(driver){
    
        let unitPriceElement = await driver.findElement(By.css("div[class='col-sm-12 col-xs-12 no-gutter pricerangebottom pricerangebottom_0'] span[class='language_sing']"));
        
        let unitPriceText = await unitPriceElement.getText();
        let unitPrice = parseFloat(unitPriceText.replace(/[^\d.]/g, ''));
        console.log("Extracted Per Unit Price is = ", unitPrice);
        
        await driver.sleep(4000)
        let extractQuantity = await driver.findElement(By.xpath("//input[@id='quantity']"))
        let quantityValue =  await extractQuantity.getAttribute('value');
        let parsedValue = parseFloat(quantityValue);
        await driver.sleep(3000)
        console.log("Extracted Quantity is = ", parsedValue);
        // Multiply single unit price with 4 to get the total calculated price
        let calculatedTotalPrice = unitPrice * parsedValue;
        console.log(`Unit Price after multiplying with ${parsedValue} = `,calculatedTotalPrice)

        // Get the total price of the product
        let totalPriceElement = await driver.findElement(By.css("body > div:nth-child(16) > div:nth-child(1) > form:nth-child(2) > div:nth-child(6) > div:nth-child(5) > div:nth-child(3) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > span:nth-child(2) > h5:nth-child(1) > span:nth-child(1) > span:nth-child(1)"));
        let totalPriceText = await totalPriceElement.getText();
        let totalPrice = parseFloat(totalPriceText.replace(/[^\d.]/g, ''));
        totalPrice=parseFloat(totalPrice);
        console.log("Total Price = ",totalPrice)
        await driver.sleep(3000)
        
        // Compare calculated total price with actual total price
        if (calculatedTotalPrice === totalPrice) {
            console.log("\n\n\First Test Case: \n Title: Match the given Price and Manually Calculated Price \n Result: \n  "+Green+'Test Passed: Prices match!\n\n');
        } else {
            console.log("\n\nFirst Test Case: \n Title: Match the given Price and Manually Calculated Price \n Result: \n  "+Red+'Test Failed: Prices do not match!\n\n');
        }
        await driver.executeScript(`sessionStorage.setItem('totalPrice',${totalPrice})`)
    
}

async function priceCheckBox(driver){
    let Chechbox1  = await driver.findElement(By.css("body > div:nth-child(16) > div:nth-child(1) > form:nth-child(2) > div:nth-child(6) > div:nth-child(5) > div:nth-child(3) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > span:nth-child(1) > div:nth-child(1) > ins:nth-child(2)"));
    await Chechbox1.click()
    driver.sleep(3000);
}

async function quoteDetailsFunc(driver){
    //Click the Quote Details
    const quoteDetailButton = await driver.findElement(By.css("button[class='btn btn-default quotedetailsbtn']"));
    await quoteDetailButton.click()
    await driver.sleep(7000)
    //Clicking Quoter comment to scroll Down. 
    const scrollDown = await driver.findElement(By.css("textarea[name='comment_msg']"));
    for(let i=1; i<=2; i++){
        await scrollDown.sendKeys(Key.PAGE_DOWN);
        await driver.sleep(4000)
    }
    
}
async function defaultServicesAndAddOns(driver) {
    // Add and Remove Services/Goods 
    //Additional Shoppers Adding 
    const addShopper = await driver.findElement(By.xpath("(//button[@type='button'])[17]"));
    await addShopper.click()
    await driver.sleep(2000)
    await addShopper.sendKeys(Key.PAGE_DOWN);
    await driver.sleep(1000)
    for (i=0; i<=4; i++){
        await addShopper.sendKeys(Key.PAGE_UP);
        await driver.sleep(1000);
    }
    //Clicking Verbal Button
    
}
async function defaultServicePriceComparison(driver){
    //Adding Services and Goods Prices to Subtotal.
    let totalPriceString = await driver.executeScript('return sessionStorage.getItem("totalPrice")');
    let totalPrice = parseFloat(totalPriceString);
    console.log("fetching priceComparison's function variable: ",totalPrice );
    let mountingAndBalance = await driver.findElement(By.xpath("(//input[@id='1'])[1]"));
    let mountingGetValue = await mountingAndBalance.getAttribute('value');
    let mountingPracedValue = parseFloat(mountingGetValue);
    console.log("Mounting and Balance (Goods) Price is = ", mountingPracedValue);
    await driver.sleep(3000)
    //Weights and Values Kit(goods)
    let weightsAndValuesElements = await driver.findElement(By.xpath("(//input[@id='0'])[1]"));
    let weightsAndValuesGet = await weightsAndValuesElements.getAttribute('value');
    let wieghtsParced = parseFloat(weightsAndValuesGet);
    console.log("Weights and Values(goods) Price = ", wieghtsParced);
    await driver.sleep(1000)
    //Ontario Tire Stewardship Fee(Services)
    let tireStewardElement = await driver.findElement(By.xpath("(//input[@id='1'])[4]"));
    let tireStewardGet = await tireStewardElement.getAttribute('value');
    let tireStewardParced = parseFloat(tireStewardGet);
    console.log("Ontario Tire Stewardship Fee(Service) = ", tireStewardParced);
    await driver.sleep(1000)
    //Testing(Services)
    let testingServicesElement = await driver.findElement(By.xpath("(//input[@id='0'])[4]"));
    let testingServicesGet = await testingServicesElement.getAttribute('value');
    let testingServicesParsed = parseFloat(testingServicesGet);
    console.log("Add on Service Value is = ", testingServicesParsed);
    await driver.sleep(1000)
    //Shoppers Module Extracting/Retrieving Values
    let addShoppersElement = await driver.findElement(By.css("body > form:nth-child(12) > div:nth-child(17) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > div:nth-child(1) > div:nth-child(9) > div:nth-child(3) > div:nth-child(18) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > input:nth-child(2)"));
    let addShoppersValueGet = await addShoppersElement.getAttribute('value');
    let parsedShoppersValue = parseFloat(addShoppersValueGet);
    console.log("Added Shoppers Value = ", parsedShoppersValue);
    await driver.sleep(1000)
    //Complete Final Value
    
    let additionOfAddOns = mountingPracedValue+wieghtsParced+tireStewardParced+parsedShoppersValue+testingServicesParsed
    let subtotalPrice = additionOfAddOns+totalPrice;
    
    await driver.sleep(3000)
    
    console.log("Final Price after Calculation is (additionOfAddOns) = ", additionOfAddOns); 
    console.log("Subtotal Price after Adding calculated and total price = ", subtotalPrice); 
    //Comparing price with addons and Subtotal Price
    let subTotalReal = await driver.findElement(By.css("body > form:nth-child(12) > div:nth-child(17) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > div:nth-child(1) > div:nth-child(9) > div:nth-child(3) > div:nth-child(22) > table:nth-child(7) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(2) > span:nth-child(1)"));
    let getSubTotalReal = await subTotalReal.getText()
    let subTotalRealParsed = parseFloat(getSubTotalReal.replace(/[^\d.]/g, ''))
    console.log("Given Subtotal Price is = ", subTotalRealParsed);
    if(subTotalRealParsed===subtotalPrice){
        console.log("\n\nSecond Test Case: \n Title: Match the given Subtotal Price and Manually Calculated Price After Add-ons  \n Result: \n  "+Green+"Subtotal Prices Matched, Test Passed\n\n");
    }
    else {
        console.log("\n\nSecond Test Case: \n Title: Match the given Subtotal Price and Manually Calculated Price After Add-ons  \n Result: \n  "+Red+"Subtotal Prices did not match, Test Failed\n\n");
    }
    
    //Adding Provisional and fedral Percentage 
    const provisionalValue = 8.002
    const fedralValue  = 13.182
    let percentageWithProvisional = subtotalPrice*provisionalValue/100
    console.log("Proviosnal Price is = ", percentageWithProvisional.toFixed(2));
    let percentageWithFedral = subtotalPrice*fedralValue/100
    console.log("Fedral Price is = ", percentageWithFedral.toFixed(2));
    const Total = subtotalPrice+percentageWithFedral+percentageWithProvisional
    console.log("Finally Total Price is = ", Total.toFixed(2));
   
    
    await driver.sleep(4000)
}


async function verbalQuotePopup1(driver) {
    const verbalButtonClick1 = await driver.findElement(By.xpath("//button[normalize-space()='Verbal']"));
    await verbalButtonClick1.click();
    await driver.sleep(4000);
    //First Name
    const firstNameVQ = await driver.findElement(By.id("fname"));
    await firstNameVQ.sendKeys("Mohsin")
    await driver.sleep(3000)
    //Last Name
    const lastNameVQ = await driver.findElement(By.id("lname"));
    await lastNameVQ.sendKeys("Ishfaq")
    await driver.sleep(3000)
    //Email
    const emailVQ = await driver.findElement(By.id("to_email"));
    await emailVQ.sendKeys("mohsinishfaq.mashkraft@gmail.com");
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
        // await searchTireInput(driver);

        //Price Comparison
        await priceComparison(driver);
        // mark the Chechbox
        await priceCheckBox(driver);
        //Quote Details 
        await quoteDetailsFunc(driver);
        //default services
        await defaultServicesAndAddOns(driver);
        //default Services Price comparison
        await defaultServicePriceComparison(driver);

        await verbalQuotePopup1(driver);
    } finally {
        console.log("Script is completed, Have a Good Day. ");
        // await driver.quit();
    }
})();

// const {Builder, By, Key, until} = require('selenium-webdriver');

// async function comparePrices() {
//     let driver = await new Builder().forBrowser('chrome').build();
//     try {
//         // Navigate to the dealership panel
//         await driver.get('https://pakautoparts.pk/yokohama-bluearth-es-es32-21565-r16');

//         // Search for the tire and retrieve total price
//         let totalPriceElement = await driver.findElement(By.xpath('//span[@class="total-price"]'));
//         let totalPrice = await totalPriceElement.getText();
//         totalPrice = parseFloat(totalPrice.replace('$', ''));

//         // Pick single unit price
//         let unitPriceElement = await driver.findElement(By.xpath('//span[@class="unit-price"]'));
//         let unitPrice = await unitPriceElement.getText();
//         unitPrice = parseFloat(unitPrice.replace('$', ''));

//         // Multiply single unit price with 4 to get the total calculated price
//         let calculatedTotalPrice = unitPrice * 4;

//         // Compare calculated total price with actual total price
//         if (calculatedTotalPrice === totalPrice) {
//             console.log('Test Passed: Prices match!');
//         } else {
//             console.log('Test Failed: Prices do not match!');
//         }
//     } finally {
//         // Close the browser
//         await driver.quit();
//     }
// }

// comparePrices();

// const removeServices = await driver.findElement(By.css("button[onclick='removeServices(0,0);']"));
    // await removeServices.click();
    // await driver.sleep(3000);
    //Add Services and then remove 
    // const addServices = await driver.findElement(By.xpath("(//button[@type='button'])[14]"));
    // await addServices.click();
    // await driver.sleep(3000);
    // const serviceDropdown = await driver.findElement(By.xpath("//option[@value='services']"));
    // await serviceDropdown.click();
    // await driver.sleep(3000);
    // //input default services
    // let inputServices = await driver.findElement(By.css("input[name='name[4][0]']"));
    // await inputServices.sendKeys("Testing2(services)");
    // await driver.sleep(3000);
    //Input Price Services
    // let inputPrice = await driver.findElement(By.css("input[name='price[4][0]']"));
    // await inputPrice.sendKeys("300.05");
    // await driver.sleep(3000)

    // Changing Values of Testing(Services)
    // const changeSerVal = await driver.findElement(By.css("body > form:nth-child(12) > div:nth-child(17) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > div:nth-child(1) > div:nth-child(9) > div:nth-child(3) > div:nth-child(11) > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > input:nth-child(2)"));
    // await changeSerVal.sendKeys(Key.CONTROL, "a");
    // await driver.sleep(3000);
    // await changeSerVal.sendKeys(Key.BACK_SPACE, "200.00");
    // await driver.sleep(2000);