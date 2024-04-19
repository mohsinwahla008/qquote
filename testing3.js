const { Builder, Browser, By, Key, until, Actions } = require('selenium-webdriver');
const { Workbook } = require('exceljs');
const path = require('path');
//Winter Tires Module Task 2

const Green = "\u001b[32m";
const Red = "\u001b[31m";
async function login(driver) {
    await driver.manage().setTimeouts({ implicit: 2000 });
    await driver.navigate().to('https://dev.qquote.com/login');
    // await driver.manage().window().maximize();
    await driver.manage().window().setSize(1280,720)
    await driver.manage().window().maximize();
    await driver.sleep(3000);
    

    const emailInput = await driver.findElement(By.css("input[name='email']"));
    await driver.actions().sendKeys(emailInput, "testermashkraft@gmail.com").perform();
    await driver.sleep(200);

    const passwordInput = await driver.findElement(By.css("input[name='password']"));
    await driver.actions().sendKeys(passwordInput, "12345678").perform();
    await driver.sleep(200);

    const loginButton = await driver.findElement(By.id("submit"));
    await driver.actions().click(loginButton).perform();
    await driver.sleep(2000);
    //Winter Tire Module
    const clickModule = await driver.findElement(By.css("img[src='./assets/assets/dist/images/single_tyre_icon.png']"));
    await driver.actions().click(clickModule).perform();
    await driver.sleep(4000);
}

async function SearchTireBySize(driver){
    const searchTireButton  = await driver.findElement(By.css("input[id='tire_size']"));
    await searchTireButton.sendKeys("215/65/17");
    await driver.sleep(1000);
    let submitQuote= await driver.findElement(By.id("submit_btn"));
    await submitQuote.click();
    await driver.sleep(3000);
}
async function markAvailRadio(driver){
  let availRadioButton = await driver.findElement(By.xpath("//label[normalize-space()='Availability']"));
  await availRadioButton.click();
  await driver.sleep(2000)
  // await availRadioButton.sendKeys(Key.PAGE_DOWN)
  // Marking Checkbox
  await availRadioButton.sendKeys(Key.PAGE_DOWN);
  await driver.sleep(2000)
  
    
}
async function settingUpQtyFunc(driver){
  let priceQuantity4 = await driver.findElement(By.css("#quantity"));
    priceQuantity4.sendKeys(Key.CONTROL, "a");
    priceQuantity4.sendKeys(Key.BACK_SPACE,"6");
    await driver.sleep(3000)
}
async function checkBoxFunc(driver){
    let Chechbox2  = await driver.findElement(By.css("body > div:nth-child(16) > div:nth-child(1) > form:nth-child(2) > div:nth-child(6) > div:nth-child(5) > div:nth-child(3) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > span:nth-child(1) > div:nth-child(1) > ins:nth-child(2)"));
    await Chechbox2.click()
    driver.sleep(3000);

}
async function dealershipName(driver){
  let nameDealer = await driver.findElement(By.xpath("/html[1]/body[1]/div[4]/div[1]/div[1]/div[1]/h3[1]"));
  let getNameDealer = await nameDealer.getText();
  console.log("Dealership: ", getNameDealer);
  return getNameDealer;
}
async function tireSize(driver){
  let tireSizeVar = await driver.findElement(By.xpath("/html[1]/body[1]/div[9]/div[1]/form[1]/div[3]/div[1]/div[3]/div[1]/div[1]/div[2]/div[1]/div[2]/div[1]/p[6]"));
  let getTireSize = await tireSizeVar.getText();
  console.log("Tire Size : ", getTireSize);
  return getTireSize;
}
async function tireBrandFunc(driver){
  let brandName = await driver.findElement(By.xpath("/html[1]/body[1]/div[9]/div[1]/form[1]/div[3]/div[1]/div[3]/div[1]/div[1]/div[2]/div[1]/div[2]/div[1]/h4[1]"));
  let getBrandName = await brandName.getText();
  console.log("Brand Name: ", getBrandName);
  return getBrandName;
}
async function partNumberFunc(driver){
  let partNumber = await driver.findElement(By.xpath("/html[1]/body[1]/div[9]/div[1]/form[1]/div[3]/div[1]/div[3]/div[1]/div[1]/div[2]/div[1]/div[2]/div[1]/p[4]"));
  let getPartNumber = await partNumber.getText();
  console.log("Part Number: ", getPartNumber);
  return getPartNumber;
}
async function unitQuantityFunc(driver){
  let unitQuantity = await driver.findElement(By.xpath("/html[1]/body[1]/div[9]/div[1]/form[1]/div[2]/div[1]/div[6]/div[1]/input[1]"));
  let getUnitQuantity = await unitQuantity.getAttribute('value');
  // let finalQuantity = getUnitQuantity.match(/\d+/);
  let parsedQuantity =parseFloat(getUnitQuantity);
  console.log("Qty: ", parsedQuantity);
  return parsedQuantity;
}
async function quoteDetailFunc(driver){
  //Quote Details
  const quoteDetailButton = await driver.findElement(By.css("button[class='btn btn-default quotedetailsbtn']"));
  await quoteDetailButton.click()
  await driver.sleep(7000)
  const scrollDown = await driver.findElement(By.css("textarea[name='comment_msg']"));
    for(let i=1; i<=2; i++){
        await scrollDown.sendKeys(Key.PAGE_DOWN);
        await driver.sleep(4000)
    }
}
async function totalPrice(driver){
  let totalPriceVar = await driver.findElement(By.xpath("(//div[contains(@class,'unit_total text-right')])[1]"));
  let getTotalPrice = await totalPriceVar.getText();
  let parsedTotalPrice = parseFloat(getTotalPrice)
  console.log("Subtotal-1: ", parsedTotalPrice);
  await driver.executeScript(`sessionStorage.setItem('parsedTotalPrice',${parsedTotalPrice})`);
  return parsedTotalPrice;
  
}
async function upSellItemsFunc(driver){
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
    await testingServicesElement.sendKeys(Key.PAGE_DOWN);
    //Shoppers Module Extracting/Retrieving Values
    // let addShoppersElement = await driver.findElement(By.css("body > form:nth-child(12) > div:nth-child(17) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > div:nth-child(1) > div:nth-child(10) > div:nth-child(3) > div:nth-child(18) > div:nth-child(1) > div:nth-child(1) > button:nth-child(1)"));
    // let addShoppersValueGet = await addShoppersElement.getAttribute('value');
    // let parsedShoppersValue = parseFloat(addShoppersValueGet);
    // console.log("Added Shoppers Value = ", parsedShoppersValue);
    // await driver.sleep(1000)
    //Complete Final Value
    
    let additionOfUpSell = mountingPracedValue+wieghtsParced+tireStewardParced+testingServicesParsed
    // let subtotalPrice = additionOfAddOns+totalPrice;
    
    await driver.sleep(3000)
    
    console.log("Final Price after Calculation is (additionOfAddOns) = ", additionOfUpSell); 
    await driver.executeScript(`sessionStorage.setItem('additionOfUpSell',${additionOfUpSell})`);
    return additionOfUpSell;
  }
  async function addOnsFunc(driver){
    
    let addOnButton = await driver.findElement(By.css("div[class='panel panel-default carshowpanel carshowpanel0 '] div[class='panel-body'] div[class='col-lg-12 col-md-12 col-sm-12 col-xs-12'] div[id='service-rows0'] div button[type='button']"));
    await addOnButton.click();
    let addOnInput = await driver.findElement(By.xpath("(//input[@id='0'])[7]"));
    let getAddOnInput = await addOnInput.getAttribute('value');
    let parsedAddOnInput = parseFloat(getAddOnInput)
    console.log("Add On Price ", parsedAddOnInput);
    await driver.executeScript(`sessionStorage.setItem('parsedAddOnInput',${parsedAddOnInput})`);
    return parsedAddOnInput;
    
  }
  async function grandTotalFunc(driver){
    await driver.sleep(3000)
    let extractTotalPrice =await driver.executeScript('return sessionStorage.getItem("parsedTotalPrice")');
    let parsedTP = parseFloat(extractTotalPrice);
    let extractUpSellPrice = await driver.executeScript('return sessionStorage.getItem("additionOfUpSell")');
    let parsedSP = parseFloat(extractUpSellPrice);
    let extractAddOnsPrice = await driver.executeScript('return sessionStorage.getItem("parsedAddOnInput")');
    let parsedAO = parseFloat(extractAddOnsPrice)
    let grandTotal = parsedAO+parsedSP+parsedTP
    console.log("Subtotal-2: ", grandTotal);
    await driver.executeScript(`sessionStorage.setItem('grandTotal',${grandTotal})`);
    return grandTotal;
  }
  async function pfTaxesFunc(driver){
    // const provisionalValue = 8.50
    // const fedralValue  = 9.75
    let proValue = await driver.findElement(By.xpath("(//td[contains(text(),'provisional')])[1]"));
    let getProValue = await proValue.getText()
    let proValueOnlyNumbers = getProValue.match(/\d+\.\d+/g)
    let parsedProValue =parseFloat(proValueOnlyNumbers);
    console.log("Provisional Value: ",parsedProValue);
    //--------------------------------------------
    //Fedral
    let fedValue = await driver.findElement(By.xpath("(//td[contains(text(),'federal')])[1]"));
    let getfedValue = await fedValue.getText()
    let fedValueOnlyNumbers = getfedValue.match(/\d+\.\d+/g)
    let parsedFedValue =parseFloat(fedValueOnlyNumbers);
    console.log("Fedral Value: ",parsedFedValue);
    //
    let extractSubTotal =await driver.executeScript('return sessionStorage.getItem("grandTotal")');
    let parsedExSubTotal = parseFloat(extractSubTotal);

    let percentageWithProvisional = parsedExSubTotal*parsedProValue/100
    let parsedProvisional =parseFloat(percentageWithProvisional.toFixed(2));
    console.log("Provisional Price is = ", parsedProvisional);
    let percentageWithFedral = parsedExSubTotal*parsedFedValue/100
    let parsedFedral =parseFloat(percentageWithFedral.toFixed(2));
    console.log("Fedral Price is = ", parsedFedral);
    ///
    let grandGrandTotal = parsedFedral+parsedProvisional+parsedExSubTotal
    let parsedGrandTotal = parseFloat(grandGrandTotal);
    console.log("Grand Total", parsedGrandTotal); 
    
    // const Total = subtotalPrice+percentageWithFedral+percentageWithProvisional
    // console.log("Finally Total Price is = ", Total.toFixed(2));
   
    
    await driver.sleep(4000)
    let quoteId = await driver.findElement(By.css("body > form:nth-child(12) > div:nth-child(15) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(6) > span:nth-child(1)"));
    await driver.executeScript('arguments[0].scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });', quoteId);
    let quoteIdGet = await quoteId.getText();
    let quoteIdParsed = parseFloat(quoteIdGet.replace(/[^\d.]/g, ''));
    console.log("Quote id is = ", quoteIdParsed);
  
    await driver.sleep(3000)
    await driver.executeScript(`sessionStorage.setItem('quoteIdParsed',${quoteIdParsed})`);
    await driver.executeScript(`sessionStorage.setItem('parsedGrandTotal',${parsedGrandTotal})`);
    return parsedGrandTotal;
  }
//=============================================================================//
//                                Quote Saved Module                           //
//=============================================================================//

async function verbalQuotePopup1(driver) {
  const verbalButtonClick1 = await driver.findElement(By.xpath("//button[normalize-space()='Verbal']"));
  await verbalButtonClick1.click();
  await driver.sleep(3000);
  //First Name
  const firstNameVQ = await driver.findElement(By.id("fname"));
  await firstNameVQ.sendKeys("a")
  
  //Last Name
  const lastNameVQ = await driver.findElement(By.id("lname"));
  await lastNameVQ.sendKeys("b")
  
  //Email
  const emailVQ = await driver.findElement(By.id("to_email"));
  await emailVQ.sendKeys("");
  
  //Phone Number
  const phoneNumberVQ = await driver.findElement(By.id("phone"));
  await phoneNumberVQ.sendKeys("1111111111");
  
  //Save(Verbal) Quote
  const saveQuoteButton = await driver.findElement(By.xpath("//div[@class='pull-right']//button[@id='submit_btn']"));
  await saveQuoteButton.click();
  await driver.sleep(12000)
}
//Third Screen 
async function quoteSavedScreen(driver){
  
  let quoteIdFetched = await driver.executeScript('return sessionStorage.getItem("quoteIdParsed")');
  // let quoteLookup = await driver.findElement(By.css("a[href='https://dev.qquote.com/wheel_tire/quote_history']"));
  // await quoteLookup.click()
  driver.sleep(4000);
  let searchQuoteId = await driver.findElement(By.css("#search-col-1"));
  await searchQuoteId.sendKeys(quoteIdFetched);
  await driver.sleep(4000)
//Quote Saved
  let typeQuote = await driver.findElement(By.css("tbody tr[role='row'] td:nth-child(4) a:nth-child(1)"));
  await typeQuote.click();
  await driver.sleep(3000)
  let scrolltoElement = await driver.findElement(By.css("body > form:nth-child(11) > div:nth-child(15) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(8) > div:nth-child(3) > div:nth-child(5) > div:nth-child(3) > div:nth-child(4) > div:nth-child(2) > span:nth-child(1) > span:nth-child(1)"));
  await driver.executeScript('arguments[0].scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });', scrolltoElement);
  //Quote Saved
  let subTotalQuoteSaved = await scrolltoElement.getText();
  let parsedSubTotalSaved = parseFloat(subTotalQuoteSaved)
  console.log("Subtotal-1 = ", parsedSubTotalSaved);
  
  await driver.sleep(3000);
  await driver.executeScript(`sessionStorage.setItem('parsedSubTotalSaved',${parsedSubTotalSaved})`);
  return parsedSubTotalSaved;
}
async function upSellItemsFuncSaved(driver){
  let mountingAndBalance = await driver.findElement(By.xpath("(//input[@id='1'])[1]"));
    let mountingGetValue = await mountingAndBalance.getAttribute('value');
    let mountingPracedValue = parseFloat(mountingGetValue);
    console.log("Mounting and Balance (Goods) Price in Saved Quote = ", mountingPracedValue);
    await driver.sleep(3000)
    //Weights and Values Kit(goods)
    let weightsAndValuesElements = await driver.findElement(By.xpath("(//input[@id='0'])[1]"));
    let weightsAndValuesGet = await weightsAndValuesElements.getAttribute('value');
    let wieghtsParced = parseFloat(weightsAndValuesGet);
    console.log("Weights and Values(goods) Price in Saved Quote = ", wieghtsParced);
    await driver.sleep(1000)
    //Ontario Tire Stewardship Fee(Services)
    let tireStewardElement = await driver.findElement(By.xpath("(//input[@id='1'])[4]"));
    let tireStewardGet = await tireStewardElement.getAttribute('value');
    let tireStewardParced = parseFloat(tireStewardGet);
    console.log("Ontario Tire Stewardship Fee(Service) in Saved Quote = ", tireStewardParced);
    await driver.sleep(1000)
    //Testing(Services)
    let testingServicesElement = await driver.findElement(By.xpath("(//input[@id='0'])[4]"));
    let testingServicesGet = await testingServicesElement.getAttribute('value');
    let testingServicesParsed = parseFloat(testingServicesGet);
    console.log("Add on Service Value in Saved Quote is = ", testingServicesParsed);
    await driver.sleep(1000)
    await testingServicesElement.sendKeys(Key.PAGE_DOWN);
    
    
    let additionOfUpSellSavedQuote = mountingPracedValue+wieghtsParced+tireStewardParced+testingServicesParsed
    // let subtotalPrice = additionOfAddOns+totalPrice;
    
    await driver.sleep(3000)
    
    console.log("Final Price after Calculation is (additionOfAddOns) Saved Quote = ", additionOfUpSellSavedQuote); 
    await driver.executeScript(`sessionStorage.setItem('additionOfUpSellSavedQuote',${additionOfUpSellSavedQuote})`);
    return additionOfUpSellSavedQuote;
  }
  async function addOnsFuncSaved(driver){
    
    
    let addOnInput = await driver.findElement(By.xpath("(//input[@id='0'])[7]"));
    let getAddOnInput = await addOnInput.getAttribute('value');
    let parsedAddOnInputSaved = parseFloat(getAddOnInput)
    console.log("Add On Price Saved ", parsedAddOnInputSaved);
    await driver.executeScript(`sessionStorage.setItem('parsedAddOnInputSaved',${parsedAddOnInputSaved})`);
    return parsedAddOnInputSaved;

  }
  async function grandTotalFuncSaved(driver){
    await driver.sleep(3000)
    let extractTotalPrice =await driver.executeScript('return sessionStorage.getItem("parsedSubTotalSaved")');
    let parsedTP = parseFloat(extractTotalPrice);
    let extractUpSellPrice = await driver.executeScript('return sessionStorage.getItem("additionOfUpSellSavedQuote")');
    let parsedSP = parseFloat(extractUpSellPrice);
    let extractAddOnsPrice = await driver.executeScript('return sessionStorage.getItem("parsedAddOnInputSaved")');
    let parsedAO = parseFloat(extractAddOnsPrice)
    let grandTotalSaved = parsedAO+parsedSP+parsedTP
    console.log("Subtotal-2 Saved Quote: ", grandTotalSaved);
    await driver.executeScript(`sessionStorage.setItem('grandTotalSaved',${grandTotalSaved})`);
    return grandTotalSaved;
  }
  async function pfSuperGrandSavedFunc(driver){
    // const provisionalValue = 8.50
    // const fedralValue  = 9.75
    let proValueSaved = await driver.findElement(By.xpath("(//td[contains(text(),'provisional')])[1]"));
    let getProValueSaved = await proValueSaved.getText()
    let proValueOnlyNumbersSaved = getProValueSaved.match(/\d+\.\d+/g)
    let parsedProValueSaved =parseFloat(proValueOnlyNumbersSaved);
    console.log("Provisional Value Saved Quote : ",parsedProValueSaved);
    //--------------------------------------------
    //Fedral
    let fedValueSaved = await driver.findElement(By.xpath("(//td[contains(text(),'federal')])[1]"));
    let getfedValueSaved = await fedValueSaved.getText()
    let fedValueOnlyNumbersSaved = getfedValueSaved.match(/\d+\.\d+/g)
    let parsedFedValueSaved =parseFloat(fedValueOnlyNumbersSaved);
    console.log("Fedral Value Saved Quote: ",parsedFedValueSaved);
    //
    let extractSubTotal2Saved =await driver.executeScript('return sessionStorage.getItem("grandTotalSaved")');
    let parsedSubtotal2Saved = parseFloat(extractSubTotal2Saved);

    let percentageProSaved = parsedSubtotal2Saved*parsedProValueSaved/100
    let parsedFinalProSaved =parseFloat(percentageProSaved.toFixed(2));
    console.log("Provisional Price in Saved Quote = ", parsedFinalProSaved);
    let percentageFedSaved = parsedSubtotal2Saved*parsedFedValueSaved/100
    let parsedFinalFedSaved =parseFloat(percentageFedSaved.toFixed(2));
    console.log("Fedral Price in Saved Quote = ", parsedFinalFedSaved);
    ///
    let superGrandTotalSaved = parsedFinalProSaved+parsedFinalFedSaved+parsedSubtotal2Saved;
    let parsedSuperGrandTotalSaved = parseFloat(superGrandTotalSaved);
    console.log("Grand Total in Saved ", parsedSuperGrandTotalSaved);
    await driver.executeScript(`sessionStorage.setItem('parsedSuperGrandTotalSaved',${parsedSuperGrandTotalSaved})`);
    return parsedSuperGrandTotalSaved;

  }

//=============================================================================
//                           Quote Sent Module                               //
//=============================================================================

async function sentQuoteBtnFunc(driver){
  let quoteId2 = await driver.findElement(By.css("body > form:nth-child(11) > div:nth-child(13) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > div:nth-child(5)"));
    await driver.executeScript('arguments[0].scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });', quoteId2);
    let quoteIdGet2 = await quoteId2.getText();
    let quoteIdParsed2 = parseFloat(quoteIdGet2.replace(/[^\d.]/g, ''));
    console.log("Quote id is = ", quoteIdParsed2);
  
  
    let sendQuoteButtonEl = await driver.findElement(By.id("submit_btn_send"));
  await driver.executeScript('arguments[0].scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });', sendQuoteButtonEl);
  await sendQuoteButtonEl.click();
  await driver.sleep(3000)
//Enter Name and Email//
//First Name
const firstNameVQ = await driver.findElement(By.id("fname"));
  await firstNameVQ.sendKeys("a")
  
  //Last Name
  const lastNameVQ = await driver.findElement(By.id("lname"));
  await lastNameVQ.sendKeys("b")
  
  //Email
  const emailVQ = await driver.findElement(By.id("to_email"));
  await emailVQ.sendKeys("ab@gmail.com");
  
  //Phone Number
  const phoneNumberVQ = await driver.findElement(By.id("phone"));
  await phoneNumberVQ.sendKeys("1111111111");
  
  //Submitting and sending quote
  let subSendQuote = await driver.findElement(By.css("body > form:nth-child(11) > div:nth-child(19) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > button:nth-child(2)"))
  await subSendQuote.click();
  await driver.sleep(4000);
  //Searching Sent Quote
  let searchQuoteId2 = await driver.findElement(By.css("#search-col-1"));
  await searchQuoteId2.sendKeys(quoteIdParsed2);
  await driver.sleep(2000)
//Third Screen
  let typeQuote2 = await driver.findElement(By.css("tbody tr[role='row'] td:nth-child(4) a:nth-child(1)"));
  await typeQuote2.click();
  await driver.sleep(4000)

  //Scrolling to Subtotal 1 Price Element
  let scrolltoElementSent = await driver.findElement(By.css("body > form:nth-child(11) > div:nth-child(15) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(8) > div:nth-child(3) > div:nth-child(5) > div:nth-child(3) > div:nth-child(4) > div:nth-child(2) > span:nth-child(1) > span:nth-child(1)"));
  await driver.executeScript('arguments[0].scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });', scrolltoElementSent);
  //Extracting text
  let subTotalQuoteSent = await scrolltoElementSent.getText();
  let parsedSubTotalSent = parseFloat(subTotalQuoteSent)
  console.log("Subtotal-1 Sent Quote = ", parsedSubTotalSent);
  await driver.executeScript(`sessionStorage.setItem('parsedSubTotalSent',${parsedSubTotalSent})`);
  return parsedSubTotalSent;
}
// UpSell 
async function upSellFuncSent(driver){
  let mountingAndBalanceSent = await driver.findElement(By.xpath("(//input[@id='1'])[1]"));
    let mountingGetValueSent = await mountingAndBalanceSent.getAttribute('value');
    let mountingPracedValueSent = parseFloat(mountingGetValueSent);
    console.log("Mounting and Balance (Goods) Price in Sent Quote = ", mountingPracedValueSent);
    await driver.sleep(3000)
    //Weights and Values Kit(goods)
    let weightsAndValuesElementsSent = await driver.findElement(By.xpath("(//input[@id='0'])[1]"));
    let weightsAndValuesGetSent = await weightsAndValuesElementsSent.getAttribute('value');
    let wieghtsParcedSent = parseFloat(weightsAndValuesGetSent);
    console.log("Weights and Values(goods) Price in Sent Quote = ", wieghtsParcedSent);
    await driver.sleep(1000)
    //Ontario Tire Stewardship Fee(Services)
    let tireStewardElementSent = await driver.findElement(By.xpath("(//input[@id='1'])[4]"));
    let tireStewardGetSent = await tireStewardElementSent.getAttribute('value');
    let tireStewardParcedSent = parseFloat(tireStewardGetSent);
    console.log("Ontario Tire Stewardship Fee(Service) in Saved Quote = ", tireStewardParcedSent);
    await driver.sleep(1000)
    //Testing(Services)
    let testingServicesElementSent = await driver.findElement(By.xpath("(//input[@id='0'])[4]"));
    let testingServicesGetSent = await testingServicesElementSent.getAttribute('value');
    let testingServicesParsedSent = parseFloat(testingServicesGetSent);
    console.log("Add on Service Value in Saved Quote is = ", testingServicesParsedSent);
    await driver.sleep(1000)
    await testingServicesElementSent.sendKeys(Key.PAGE_DOWN);
    
    
    let additionOfUpSellSentQuote = mountingPracedValueSent+wieghtsParcedSent+tireStewardParcedSent+testingServicesParsedSent
    // let subtotalPrice = additionOfAddOns+totalPrice;
    
    await driver.sleep(3000)
    
    console.log("Final Price after Calculation (additionOfAddOns) in  Saved Quote = ", additionOfUpSellSentQuote); 
    await driver.executeScript(`sessionStorage.setItem('additionOfUpSellSentQuote',${additionOfUpSellSentQuote})`);
    return additionOfUpSellSentQuote;
  }
  // Add Ons
  async function addOnsFuncSent(driver){
    
    
    let addOnInputSent = await driver.findElement(By.xpath("(//input[@id='0'])[7]"));
    let getAddOnInputSent = await addOnInputSent.getAttribute('value');
    let parsedAddOnInputSent = parseFloat(getAddOnInputSent)
    console.log("Add On Price in Sent Quote ", parsedAddOnInputSent);
    await driver.executeScript(`sessionStorage.setItem('parsedAddOnInputSent',${parsedAddOnInputSent})`);
    return parsedAddOnInputSent;
  }
  //Subtotal 2 Sent Quote Module
  async function subTotal2SentFunc(driver){
    await driver.sleep(3000)
    let extractTotalPriceSent =await driver.executeScript('return sessionStorage.getItem("parsedSubTotalSent")');
    let parsedTPSent = parseFloat(extractTotalPriceSent);
    console.log("Parsed Subtotal-1 ", parsedTPSent);
    let extractUpSellPriceSent = await driver.executeScript('return sessionStorage.getItem("additionOfUpSellSentQuote")');
    let parsedUPSent = parseFloat(extractUpSellPriceSent);
    console.log("Parsed UPSell Sent",parsedUPSent);
    let extractAddOnsPriceSent = await driver.executeScript('return sessionStorage.getItem("parsedAddOnInputSent")');
    let parsedAOSent = parseFloat(extractAddOnsPriceSent)
    console.log("Parsed Add Ons ", parsedAOSent);
    let subtotal2TotalSent = parsedAOSent+parsedUPSent+parsedTPSent;
    console.log("Subtotal-2 Saved Quote: ", subtotal2TotalSent);
    await driver.executeScript(`sessionStorage.setItem('subtotal2TotalSent',${subtotal2TotalSent})`);
    return subtotal2TotalSent;
  }
  // Taxes and Grand Final Price

  async function pfGrandPriceSent(driver){
    // const provisionalValue = 8.50
    // const fedralValue  = 9.75
    let proValueSent = await driver.findElement(By.xpath("(//td[contains(text(),'provisional')])[1]"));
    let getProValueSent = await proValueSent.getText()
    let proValueOnlyNumbersSent = getProValueSent.match(/\d+\.\d+/g)
    let parsedProValueSent =parseFloat(proValueOnlyNumbersSent);
    console.log("Provisional Value Sent Quote : ",parsedProValueSent);
    //--------------------------------------------
    //Fedral
    let fedValueSent = await driver.findElement(By.xpath("(//td[contains(text(),'federal')])[1]"));
    let getfedValueSent = await fedValueSent.getText()
    let fedValueOnlyNumbersSent = getfedValueSent.match(/\d+\.\d+/g)
    let parsedFedValueSent =parseFloat(fedValueOnlyNumbersSent);
    console.log("Fedral Value Sent Quote: ",parsedFedValueSent);
    //
    let extractSubTotal2Sent =await driver.executeScript('return sessionStorage.getItem("subtotal2TotalSent")');
    let parsedSubtotal2Sent = parseFloat(extractSubTotal2Sent);

    let percentageProSent = parsedSubtotal2Sent*parsedProValueSent/100
    let parsedFinalProSent =parseFloat(percentageProSent.toFixed(2));
    console.log("Provisional Price in Sent Quote = ", parsedFinalProSent);
    let percentageFedSent = parsedSubtotal2Sent*parsedFedValueSent/100
    let parsedFinalFedSent =parseFloat(percentageFedSent.toFixed(2));
    console.log("Fedral Price in Sent Quote = ", parsedFinalFedSent);
    ///
    let superGrandTotalSent = parsedFinalProSent+parsedFinalFedSent+parsedSubtotal2Sent;
    let parsedSuperGrandTotalSent = parseFloat(superGrandTotalSent);
    console.log("Grand Total in Sent Quote ", parsedSuperGrandTotalSent);
    await driver.executeScript(`sessionStorage.setItem('parsedSuperGrandTotalSent',${parsedSuperGrandTotalSent})`);
    return parsedSuperGrandTotalSent;

  }
  //===========================================================================//
  //                        Prices Comparison                                 //
  //==========================================================================//
  //Subtotal-1 Prices Comparison
  async function subtotal1Comparison(driver){
    //Sub-1 Quote Details
    let subTotal1DetailCom = await driver.executeScript('return sessionStorage.getItem("parsedTotalPrice")');
    let fetchedSub1DetailsCom = parseFloat(subTotal1DetailCom);
    console.log("Subtotal-1 in quote details price for comparison ", fetchedSub1DetailsCom);
    //Sub-1 Quote Saved
    let subTotal1SavedCom = await driver.executeScript('return sessionStorage.getItem("parsedSubTotalSaved")');
    let fetchedSubSavedCom = parseFloat(subTotal1SavedCom);
    console.log("Subtotal-1 in quote saved price for comparison ", fetchedSubSavedCom);
    //Sub-1 Quote Sent
    let subTotal1SentCom = await driver.executeScript('return sessionStorage.getItem("parsedSubTotalSent")');
    let fetchedSubSentCom = parseFloat(subTotal1SentCom);
    console.log("Subtotal-1 in quote sent price for comparison ", fetchedSubSentCom);
    //comparison starts here
    let resultOfSub1 = (fetchedSub1DetailsCom===fetchedSubSavedCom && fetchedSubSavedCom===fetchedSubSentCom) ?
    "Passed!" : "Failed!"
      console.log(resultOfSub1);
      return resultOfSub1;
    

}
//                    ADD Ons Price Comparison

async function addOnsPriceComp(driver){
    //Quote Details Module
    let addOnsDetailsComp = await driver.executeScript('return sessionStorage.getItem("parsedAddOnInput")');
    let fetchedAddOnsDetailsComp = parseFloat(addOnsDetailsComp)
    console.log("Fetched Add Ons Price Details ", fetchedAddOnsDetailsComp);
    // Quote Saved Module
    let addOnsSavedComp = await driver.executeScript('return sessionStorage.getItem("parsedAddOnInputSaved")');
    let fetchedAddOnsSavedComp = parseFloat(addOnsSavedComp);
    console.log("Fetched Add Ons Price Saved ", fetchedAddOnsSavedComp);
    //Quote Sent Module 
    let addOnsSentComp = await driver.executeScript('return sessionStorage.getItem("parsedAddOnInputSent")');
    let fetchedAddOnsSentComp = parseFloat(addOnsSentComp);
    console.log("Fetched add ons price Sent ", fetchedAddOnsSentComp);
    //Comparison
    let resultOfAddOns = (fetchedAddOnsDetailsComp===fetchedAddOnsSavedComp && fetchedAddOnsSavedComp===fetchedAddOnsSentComp) ?
    "Passed!" : "Failed!"
    console.log("Result of Add Ons", resultOfAddOns);
    return resultOfAddOns;
  }
  //                Upsell Price Comparison
  // Upsell Details Quote Module
  async function upSellPriceComparison(driver){
    //Details Quote Module
    let upSellDetailsComp = await driver.executeScript('return sessionStorage.getItem("additionOfUpSell")');
    let fetchedUpSellDetailsComp = parseFloat(upSellDetailsComp);
    console.log("UpSell Items Price Details ", fetchedUpSellDetailsComp);
    //Saved Quote Module
    let upSellSavedComp = await driver.executeScript('return sessionStorage.getItem("additionOfUpSellSavedQuote")');
    let fetchedUpSellSavedComp = parseFloat(upSellSavedComp);
    console.log("UpSell Items Price Saved ", fetchedUpSellSavedComp);
    //Sent Quote Module
    let upSellSentComp = await driver.executeScript('return sessionStorage.getItem("additionOfUpSellSentQuote")');
    let fetchedUpSellSentComp = parseFloat(upSellSentComp);
    console.log("UpSell Items Price Sent ", fetchedUpSellSentComp);
    //Comparison
    let resultOfUpSell = (fetchedUpSellDetailsComp===fetchedUpSellSavedComp && fetchedUpSellSavedComp===fetchedUpSellSentComp) ?
    "Passed!" : "Failed!"
    console.log("Result for UpSell Items ", resultOfUpSell);
    return resultOfUpSell;
  }
  // Subtotal-2 Price comparison
  async function subtotal2Comparison(driver){
    let subtotal2DetailsComp = await driver.executeScript('return sessionStorage.getItem("grandTotal")');
    let fetchedSubtotal2DetailsComp = parseFloat(subtotal2DetailsComp);
    console.log("Subtotal-2 Details Price ", fetchedSubtotal2DetailsComp);
    //Saved Quote Module
    let subtotal2SavedComp = await driver.executeScript('return sessionStorage.getItem("grandTotalSaved")');
    let fetchedSubtotal2SavedComp = parseFloat(subtotal2SavedComp);
    console.log("Subtotal-2 Saved Price ", fetchedSubtotal2SavedComp);
    //Sent Quote Module
    let subtotal2SentComp =await driver.executeScript('return sessionStorage.getItem("subtotal2TotalSent")');
    let fetchedSubtotal2SentComp = parseFloat(subtotal2SentComp);
    console.log("Subtotal-2 Sent Price ", fetchedSubtotal2SentComp);
    //comparison 
    let resultOfSub2 = (fetchedSubtotal2DetailsComp===fetchedSubtotal2SavedComp && fetchedSubtotal2SavedComp===fetchedSubtotal2SentComp) ?
    "Passed!" : "Failed!"
    console.log("Result Subtotal-2 ", resultOfSub2);
    return resultOfSub2;
  }
  //Grand Final Price Comparison
  async function grandPriceComparison(driver){
    let grandPriceDetailsComp = await driver.executeScript('return sessionStorage.getItem("parsedGrandTotal")');
    let fetchedGrandDetailsComp = parseFloat(grandPriceDetailsComp);
    console.log("Grand price Details ", fetchedGrandDetailsComp);
    //Saved Quote Module
    let grandPriceSavedComp =await driver.executeScript('return sessionStorage.getItem("parsedSuperGrandTotalSaved")');
    let fetchedGrandSavedComp = parseFloat(grandPriceSavedComp);
    console.log("Grand Saved Price ", fetchedGrandSavedComp);
    //Sent Quote Module
    let grandPriceSentComp =await driver.executeScript('return sessionStorage.getItem("parsedSuperGrandTotalSent")');
    let fetchedGrandSentComp = parseFloat(grandPriceSentComp);
    console.log("Grand Sent Price ", fetchedGrandSentComp);
    //comparison 
    let resultOfGrandPrice = (fetchedGrandDetailsComp===fetchedGrandSavedComp && fetchedGrandSavedComp===fetchedGrandSentComp) ?
    "Passed!" : "Failed!"
    console.log("Result Grand  ", resultOfGrandPrice);
    return resultOfGrandPrice;
  }



  function generateRandomDigit() {
    return Math.floor(Math.random() * 30);
}
async function exportToExcel(dealershipName,tireSize,tireBrandFunc,partNumberFunc,unitQuantityFunc, totalPrice,
  upSellItemsFunc,addOnsFunc,grandTotalFunc, pfTaxesFunc,quoteSavedScreen, additionOfUpSellSavedQuote,parsedAddOnInputSaved,
  grandTotalSaved,pfSuperGrandSavedFunc,sentQuoteBtnFunc,upSellFuncSent,addOnsFuncSent,subTotal2SentFunc
  ,pfGrandPriceSent,subtotal1Comparison,addOnsPriceComp,upSellPriceComparison,
  subtotal2Comparison,grandPriceComparison) 

{
  const workbook = new Workbook();
  const worksheet = workbook.addWorksheet('Dealerships');
  
  // Add headers
  worksheet.addRow(['Dealership ', dealershipName]);
  worksheet.addRow(['Tire Size', tireSize]);
  worksheet.addRow(['Tire Brand', tireBrandFunc]);
  worksheet.addRow(['Part Number', partNumberFunc]);
  worksheet.addRow(['Qty', unitQuantityFunc]);
  
  worksheet.addRow(['', '','', '']);
  worksheet.addRow(['', 'Quote Details','Saved Quote', 'Sent Quote', 'Actual Result']);
  worksheet.addRow(['Subtotal-1', totalPrice,quoteSavedScreen,sentQuoteBtnFunc,subtotal1Comparison]);
  worksheet.addRow(['Add Ons', addOnsFunc,parsedAddOnInputSaved,addOnsFuncSent,addOnsPriceComp])
  worksheet.addRow(['Upsell', upSellItemsFunc,additionOfUpSellSavedQuote,upSellFuncSent,upSellPriceComparison]);
  worksheet.addRow(['Subtotal-2', grandTotalFunc,grandTotalSaved,subTotal2SentFunc,subtotal2Comparison])
  worksheet.addRow(['Grand Total', pfTaxesFunc,pfSuperGrandSavedFunc,pfGrandPriceSent,grandPriceComparison])

  worksheet.columns.forEach(column => {
    if (column.header) {
        column.width = column.header.length < 16 ? 16 : column.header.length;
    } else {
        // Adjust width based on content
        const maxLength = column.values.reduce((max, value) => {
            const length = value ? value.toString().length : 0;
            return Math.max(max, length);
        }, 0);
        column.width = maxLength < 16 ? 16 : maxLength;
    }
});
  // Add data
  // worksheet.addRow([dealershipName]);
  const folderName = 'Exported Data';
  const randomDigit = generateRandomDigit();

  // const timestamp = new Date().toISOString().replace(/:/g, '-');
  const fileName = `testResult_${randomDigit}.xlsx`;
  
  // Save workbook
  const filePath = path.join(__dirname,folderName,fileName);
  // await workbook.xlsx.writeFile(`dealerships_${timestamp}.xlsx`);
  await workbook.xlsx.writeFile(filePath);
  console.log('Excel file created successfully.');
}

(async function example() {
  // Create a new WebDriver instance
  let driver = await new Builder().forBrowser('chrome').build();
  
  try {
    await login(driver);
    await SearchTireBySize(driver);
    await markAvailRadio(driver);
    await settingUpQtyFunc(driver);
    await checkBoxFunc(driver);
    // Exporting Data
    const exportDealer = await dealershipName(driver);
    const exportTireSize= await tireSize(driver);
    const exportTireBrand = await tireBrandFunc(driver);
    const exportPartNumber = await partNumberFunc(driver);
    const exportQuantity = await unitQuantityFunc(driver);
    await quoteDetailFunc(driver);
    const exportTotalPrice = await totalPrice(driver);
    const exportUpSell = await upSellItemsFunc(driver);
    const exportAddOns = await addOnsFunc(driver);
    const exportGrandTotal = await grandTotalFunc(driver);
    const exportSubtotalPlusTaxes =await pfTaxesFunc(driver);
    await verbalQuotePopup1(driver);
    // Saved Quote Starts here
    const exportSavedSubtotal =await quoteSavedScreen(driver);
    const exportUpSellSaved =await upSellItemsFuncSaved(driver);
    const exportAddOnsSaved =await addOnsFuncSaved(driver);
    const exportGrandTotalSaved =await grandTotalFuncSaved(driver);
    const exportSuperGrandTotal = await pfSuperGrandSavedFunc(driver);
    //Sent Quote Starts Here
    const exportSubtotal1Sent = await sentQuoteBtnFunc(driver);
    const exportUpSellSent = await upSellFuncSent(driver);
    const exportAddOnsSent = await addOnsFuncSent(driver);
    const exportSubtotal2Sent = await subTotal2SentFunc(driver);
    const exportGrandTotalSent = await pfGrandPriceSent(driver);
    //Subtotal-1 Price Comparison
    const exportSubTotal1Comp = await subtotal1Comparison(driver);
    const exportAddOnsComp = await addOnsPriceComp(driver);
    const exportUpSellComp = await upSellPriceComparison(driver);
    const exportSubTotal2Comp = await subtotal2Comparison(driver);
    const exportGrandPComp = await grandPriceComparison(driver);
    await exportToExcel(exportDealer,exportTireSize,exportTireBrand,
      exportPartNumber,exportQuantity, exportTotalPrice, exportUpSell,
      exportAddOns, exportGrandTotal,exportSubtotalPlusTaxes, exportSavedSubtotal,exportUpSellSaved,exportAddOnsSaved,
      exportGrandTotalSaved,exportSuperGrandTotal,exportSubtotal1Sent,exportUpSellSent
      ,exportAddOnsSent,exportSubtotal2Sent,exportGrandTotalSent,exportSubTotal1Comp
      , exportSubTotal1Comp,exportUpSellComp,exportAddOnsComp,exportSubTotal2Comp,
      exportGrandPComp);

  } catch (error) {
    console.error('Error:', error);
  } finally {
    // Close the WebDriver session
    await driver.quit();
  }
})();
