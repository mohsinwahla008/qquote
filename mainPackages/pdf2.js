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

async function selectOptionFromDropdown(driver) {
    await driver.manage().setTimeouts({ implicit: 5000 });
    let selectElement = await driver.findElement(By.id("select2-make-container"));
    await selectElement.click();
    

    let searchEle = await driver.findElement(By.css("input[class='select2-search__field']"));
    await searchEle.sendKeys("Toyota", Key.ENTER);
    

    let selectModel = await driver.findElement(By.css("body > div:nth-child(10) > div:nth-child(1) > form:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > span:nth-child(2) > span:nth-child(1) > span:nth-child(1)"));
    await selectModel.click();

    let searchModal = await driver.findElement(By.css("input[class='select2-search__field']"));
    await searchModal.sendKeys("Camry", Key.ENTER);


    let selectYear = await driver.findElement(By.css("#select2-year_id-container"));
    await selectYear.click();
    
    let yearDropdown = await driver.findElement(By.css("option[value='2023']"));
    await yearDropdown.click();
    
    await selectYear.click();
    

    let selectTrim = await driver.findElement(By.css("#select2-trim_id-container"))
    await selectTrim.click();
    
    let trimDrp = await driver.findElement(By.css("option[value='366249']"));
    await trimDrp.click();
    await driver.manage().setTimeouts({ implicit: 0 });
    
}
async function submitQuoteButton(driver) {
    await driver.manage().setTimeouts({ implicit: 5000 });
    let submitQuote= await driver.findElement(By.id("submit_btn"));
    await submitQuote.click();
    
//Clicking Availability
    let availRadioButton = await driver.findElement(By.xpath("//label[normalize-space()='Availability']"));
  await availRadioButton.click();

  //Changing the Brand 
  let brandChange = await driver.findElement(By.css("div[class='tireslider tireslider_0 slick-initialized slick-slider'] button[aria-label='Next']"));
  await brandChange.click();

  //Clicking Price CheckBox
    let checkBoxPrice = await driver.findElement(By.css("div[class='panel-heading heading_0'] ins[class='iCheck-helper']"));
    await driver.executeScript("arguments[0].scrollIntoView(true);", checkBoxPrice);
    await checkBoxPrice.click();

    //------------------------------------Fetching Details about Dealership and Tire Brand
    //Dealership Module
    let moduleName = await driver.findElement(By.css("div[class='col-lg-8 col-md-12 col-sm-12 col-xs-12'] h3"));
    let getModuleName = await moduleName.getText();
    console.log("Dealership Module Name: ", getModuleName);
    //Brand Name
    let brandName = await driver.findElement(By.css("div[class='panel panel-default carshowpanel carshowpanel_0'] div[class='panel-body'] div[class='col-lg-4 col-md-4 col-sm-4 col-xs-12'] div h4[class='tire_type m-t-none l-h m-b-none']"));
    let getBrandName = await brandName.getText();
    console.log("Brand Name: ", getBrandName);
    //Part Number
    let partNumber = await driver.findElement(By.css("div[class='panel panel-default carshowpanel carshowpanel_0'] div[class='panel-body'] div[class='col-lg-4 col-md-4 col-sm-4 col-xs-12'] div p[class='part_number']"));
    let getPartNumber = await partNumber.getText();
    console.log("Part Number ", getPartNumber);
    //Tire Size
    let tireSize = await driver.findElement(By.css("div[class='panel panel-default carshowpanel carshowpanel_0'] div[class='panel-body'] div[class='col-lg-4 col-md-4 col-sm-4 col-xs-12'] div p[class='tire_size']"));
    let getTireSize = await tireSize.getText();
    console.log("Tire Size ", getTireSize);

    //Clicking Quote Details Button
    let quoteDetailButton = await driver.findElement(By.css("button[class='btn btn-default quotedetailsbtn']"));
    await driver.executeScript("arguments[0].scrollIntoView(true);", quoteDetailButton);
    await quoteDetailButton.click();
    

  await driver.manage().setTimeouts({ implicit: 0 });
  return [getModuleName,getBrandName,getPartNumber,getTireSize];
  
}
async function quoteDetailsDirect(driver){
    await driver.manage().setTimeouts({ implicit: 5000 });
    // Direct Subtotal and Tax Rate calculating correctly
    //Car Model
    let carDetails = await driver.findElement(By.css("body > form:nth-child(10) > div:nth-child(14) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > h4:nth-child(3)"));
    let getCarDetails = await carDetails.getText();
    console.log("Car Details ", getCarDetails);

    
    //Tires Per Unit
    let unitTires = await driver.findElement(By.css("body > form:nth-child(10) > div:nth-child(16) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > div:nth-child(1) > div:nth-child(11) > div:nth-child(3) > div:nth-child(8) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > span:nth-child(1)"));
    let fetchUnitTires = await unitTires.getText();
    let parsedUnitTires = parseFloat(fetchUnitTires);
    console.log("Unit Price of Tires: ", parsedUnitTires);

    let finalTiresPriceDirect = parsedUnitTires*4;
    console.log("Final Tires Price: ",finalTiresPriceDirect);

    //Wheels Per Unit
    let unitWheels = await driver.findElement(By.css("div[class='panel panel-default carshowpanel carshowpanel0'] div:nth-child(1) div:nth-child(2) div:nth-child(3) span:nth-child(1)"));
    let fetchUnitWheels = await unitWheels.getText();
    let parsedUnitWheels = parseFloat(fetchUnitWheels);
    console.log("Wheels Per Unit Price: ",parsedUnitWheels);
    let finalWheelsPriceDirect = parsedUnitWheels*4;
    console.log("Final Wheels Price: ",finalWheelsPriceDirect);

    //TPMS Sensors Price
    let sensorsUnitPrice = await driver.findElement(By.xpath("/html[1]/body[1]/form[1]/div[2]/div[1]/div[1]/div[3]/div[1]/div[1]/div[2]/div[3]/div[4]/div[1]/div[3]/div[3]/span[1]"))
    let fetchSensorsUnit = await sensorsUnitPrice.getText();
    let parsedSensorsUnit = parseFloat(fetchSensorsUnit);
    console.log("Sensors Per Unit Price ",parsedSensorsUnit );
    let finalSensorsPrice = parsedSensorsUnit*4;
    console.log("Final Sensors Price = ", finalSensorsPrice);
    //TPMS Labour
    let SensorsLabour = await driver.findElement(By.xpath("/html[1]/body[1]/form[1]/div[2]/div[1]/div[1]/div[3]/div[1]/div[1]/div[2]/div[3]/div[4]/div[1]/div[6]/div[4]/span[1]"));
    let fetchLabourPrice = await SensorsLabour.getText();
    let parsedLabourPrice = parseFloat(fetchLabourPrice);
    console.log("TPMS Labour = ", parsedLabourPrice);


    //Extracting Subtotal-1 Price before TPMS
    let subtotalOne = (finalTiresPriceDirect+finalWheelsPriceDirect+finalSensorsPrice+parsedLabourPrice).toFixed(2);
   let parsedSubOneDirect = parseFloat(subtotalOne);
    console.log("Direct Subtotal-1: ",parsedSubOneDirect);
    await driver.executeScript(`sessionStorage.setItem('parsedSubOneDirect',${parsedSubOneDirect})`);
    return [getCarDetails ,parsedUnitTires,finalTiresPriceDirect,parsedUnitWheels,finalWheelsPriceDirect,parsedSensorsUnit
    ,finalSensorsPrice, parsedLabourPrice,parsedSubOneDirect]

}
async function upSellDirect(driver){
    await driver.manage().setTimeouts({implicit: 5000});
    console.log("Upsell Items List");
    let mountingAndBalance = await driver.findElement(By.xpath("(//input[@id='1'])[10]"));
      let mountingGetValue = await mountingAndBalance.getAttribute('value');
      let mountingPracedValue = parseFloat(mountingGetValue);
      console.log("Mounting and Balance (Goods) Price is = ", mountingPracedValue);
      
      //Wheel Nuts (goods)
      let weightsAndValuesElements = await driver.findElement(By.xpath("(//input[@name='price[1][1]'])[1]"));
      let weightsAndValuesGet = await weightsAndValuesElements.getAttribute('value');
      let wieghtsParced = parseFloat(weightsAndValuesGet);
      console.log("Wheel nuts(required for steel rims and some alloy rims)= ", wieghtsParced);
      
      //Ontario Tire Stewardship Fee(Services)
      let tireStewardElement = await driver.findElement(By.xpath("(//input[@id='1'])[13]"));
      let tireStewardGet = await tireStewardElement.getAttribute('value');
      let tireStewardParced = parseFloat(tireStewardGet);
      console.log("Ontario Tire Stewardship Fee ($4.50/tire) = ", tireStewardParced);
      
      //Testing(Services)
      let testingServicesElement = await driver.findElement(By.xpath("(//input[@id='1'])[16]"));
      let testingServicesGet = await testingServicesElement.getAttribute('value');
      let testingServicesParsed = parseFloat(testingServicesGet);
      console.log("Weights and Valves Kit = ", testingServicesParsed);
      
      let additionOfUpSell = mountingPracedValue+wieghtsParced+tireStewardParced+testingServicesParsed
      // let subtotalPrice = additionOfAddOns+totalPrice;
      
      console.log("Final Price after Calculation is (additionOfAddOns) = ", additionOfUpSell); 
      await driver.executeScript(`sessionStorage.setItem('additionOfUpSell',${additionOfUpSell})`);
      let getSubOne =await driver.executeScript('return sessionStorage.getItem("parsedSubOneDirect")');
      let parsedSubOne = parseFloat(getSubOne)
      let subTwoDirect = additionOfUpSell+parsedSubOne;
      let parsedSubTwoDirect = parseFloat(subTwoDirect);
      console.log("Subtotal-2 Direct ", parsedSubTwoDirect);
      await driver.executeScript(`sessionStorage.setItem('parsedSubTwoDirect',${parsedSubTwoDirect})`);
      return [additionOfUpSell,parsedSubTwoDirect]
}
async function addingTaxDirect(driver){
    //extracting tax Percentage
    let taxPercent = await driver.findElement(By.css("body > form:nth-child(10) > div:nth-child(16) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > div:nth-child(1) > div:nth-child(11) > div:nth-child(3) > div:nth-child(28) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(5) > th:nth-child(1)"));
    let getTaxPercent = await taxPercent.getText();
    let taxPerOnlyNumbers = getTaxPercent.match(/\d+\.\d+/g)
    let parsedTaxPer = parseFloat(taxPerOnlyNumbers);
    console.log("Tax Percentage ", parsedTaxPer);
    // calculating Tax Price
    let SubTwoDirect = await driver.executeScript('return sessionStorage.getItem("parsedSubTwoDirect")');
    let parsedSubTwoDirect = parseFloat(SubTwoDirect);
    let taxPrice = (parsedSubTwoDirect*parsedTaxPer)/100
    let parsedTaxPrice = parseFloat(taxPrice);
    console.log("calculated Tax Price = ", parsedTaxPrice);
    //Calculating Total Price after Adding Tax
    console.log("Parsed Subtotal-2 Direct is = ", parsedSubTwoDirect);
    let totalPriceDirect = parsedSubTwoDirect+parsedTaxPrice
    let parsedTotalPriceDirect = parseFloat(totalPriceDirect);
    console.log("Total Price = ", parsedTotalPriceDirect);
    return [parsedTaxPrice,parsedTotalPriceDirect];
}

async function quoteDetailsTPMS(driver){
   
    await driver.manage().setTimeouts({ implicit: 5000 });
    //Subtotal and Tax Rate calculating correctly
    
     //TPMS CheckBox

     //unCheck TPMS
    console.log("Without adding TPMS ");
    let tpmsCheck = await driver.findElement(By.css("body > form:nth-child(10) > div:nth-child(16) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > div:nth-child(1) > div:nth-child(11) > div:nth-child(3) > p:nth-child(5) > span:nth-child(9) > div:nth-child(1) > ins:nth-child(2)"));
    await driver.executeScript("arguments[0].scrollIntoView(true);", tpmsCheck);
    await tpmsCheck.click();
                                   //calculating first Subtotal
    //Tires Per Unit
    let unitTires = await driver.findElement(By.css("body > form:nth-child(10) > div:nth-child(16) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > div:nth-child(1) > div:nth-child(11) > div:nth-child(3) > div:nth-child(8) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3)"));
    let fetchUnitTires = await unitTires.getText();
    let parsedUnitTiresNon = parseFloat(fetchUnitTires);
    console.log("Unit Price of Tires: ", parsedUnitTiresNon);
    let finalTiresPriceNon = parsedUnitTiresNon*4;
    console.log("Final Tires Price: ",finalTiresPriceNon);

    //Wheels Per Unit
    let unitWheels = await driver.findElement(By.css("div[class='panel panel-default carshowpanel carshowpanel0'] div:nth-child(1) div:nth-child(2) div:nth-child(3) span:nth-child(1)"));
    let fetchUnitWheels = await unitWheels.getText();
    let parsedUnitWheelsNon = parseFloat(fetchUnitWheels);
    console.log("Wheels Per Unit Price: ",parsedUnitWheelsNon);
    let finalWheelsPriceNon = parsedUnitWheelsNon*4;
    console.log("Final Wheels Price: ",finalWheelsPriceNon);

    //Extracting Subtotal-1 Price before TPMS
    let subtotalOneNon = (finalTiresPriceNon+finalWheelsPriceNon).toFixed(2);
    let parsedSubOneNonTPMS = parseFloat(subtotalOneNon);
    console.log("Before Adding TPMS , Subtotal-1: ",parsedSubOneNonTPMS);
    await driver.executeScript(`sessionStorage.setItem('parsedSubOneNonTPMS',${parsedSubOneNonTPMS})`);
    return [parsedUnitTiresNon,finalTiresPriceNon,parsedUnitWheelsNon,finalWheelsPriceNon,parsedSubOneNonTPMS];
}
    async function upSellUnCheckTPMS(driver){
        await driver.manage().setTimeouts({implicit: 5000});
        console.log("Upsell Items List");
        let mountingAndBalance = await driver.findElement(By.xpath("(//input[@id='1'])[10]"));
          let mountingGetValue = await mountingAndBalance.getAttribute('value');
          let mountingPracedValue = parseFloat(mountingGetValue);
          console.log("Mounting and Balance (Goods) Price is = ", mountingPracedValue);
          
          //Wheel Nuts (goods)
          let wheelNuts = await driver.findElement(By.xpath("(//input[@name='price[1][1]'])[1]"));
          let getWheelNuts = await wheelNuts.getAttribute('value');
          let parsedWheelNuts = parseFloat(getWheelNuts);
          console.log("Wheel nuts(required for steel rims and some alloy rims)= ", parsedWheelNuts);
          
          //Ontario Tire Stewardship Fee(Services)
          let tireStewardElement = await driver.findElement(By.xpath("(//input[@id='1'])[13]"));
          let tireStewardGet = await tireStewardElement.getAttribute('value');
          let tireStewardParced = parseFloat(tireStewardGet);
          console.log("Ontario Tire Stewardship Fee ($4.50/tire) = ", tireStewardParced);
          
          //Weights and Values Kit
          let weightsAndValues = await driver.findElement(By.xpath("(//input[@id='1'])[16]"));
          let getWeightsAndValues = await weightsAndValues.getAttribute('value');
          let parsedWV = parseFloat(getWeightsAndValues);
          console.log("Weights and Values Kit = ", parsedWV);
          
          let additionOfUpSellNon = mountingPracedValue+parsedWheelNuts+tireStewardParced+parsedWV
          // let subtotalPrice = additionOfAddOns+totalPrice;
          console.log("Final Price after Calculation is (additionOfAddOns) = ", additionOfUpSellNon); 
          await driver.executeScript(`sessionStorage.setItem('additionOfUpSellNon',${additionOfUpSellNon})`);
          let getSubOneNon =await driver.executeScript('return sessionStorage.getItem("parsedSubOneNonTPMS")');
          let parsedSubOneNon = parseFloat(getSubOneNon)
          let subTwoNon = (additionOfUpSellNon+parsedSubOneNon).toFixed(2);
          let parsedSubTwoNon = parseFloat(subTwoNon);
          console.log("Subtotal-2 None-TPMS ", parsedSubTwoNon);
          await driver.executeScript(`sessionStorage.setItem('parsedSubTwoNon',${parsedSubTwoNon})`);
          return [additionOfUpSellNon,parsedSubTwoNon];
    }
    async function addingTaxNonTPMS(driver){
        await driver.manage().setTimeouts({implicit: 5000});
        //extracting tax Percentage
        let taxPercent = await driver.findElement(By.css("body > form:nth-child(10) > div:nth-child(16) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > div:nth-child(1) > div:nth-child(11) > div:nth-child(3) > div:nth-child(28) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(5) > th:nth-child(1)"));
        let getTaxPercent = await taxPercent.getText();
        let taxPerOnlyNumbers = getTaxPercent.match(/\d+\.\d+/g)
        let parsedTaxPer = parseFloat(taxPerOnlyNumbers);
        console.log("Tax Percentage ", parsedTaxPer);
        // calculating Tax Price
        let subTwoNon =await driver.executeScript('return sessionStorage.getItem("parsedSubTwoNon")');
        
        let parsedSubtotalTwoNon = parseFloat(subTwoNon);
        let taxPrice = ((parsedSubtotalTwoNon*parsedTaxPer)/100).toFixed(2);
        let parsedTaxPriceNon = parseFloat(taxPrice);
        console.log("calculated Tax Price after Unchecking TPMS = ", parsedTaxPriceNon);
        //Calculating Total Price after Adding Tax
        
        let totalPriceNon = (parsedSubtotalTwoNon+parsedTaxPriceNon).toFixed(2);
        let parsedTotalPriceNon = parseFloat(totalPriceNon);
        console.log("Total Price Non TPMS = ", parsedTotalPriceNon);
        return [parsedTaxPriceNon,parsedTotalPriceNon];
    }
    //---------------------Removing /Adding upsell and shoppers---------------------
    async function modifyUpSell(driver){
        await driver.manage().setTimeouts({implicit: 5000});
        console.log("Upsell Items List");
        let mountingAndBalance = await driver.findElement(By.xpath("(//input[@id='1'])[10]"));
          let mountingGetValue = await mountingAndBalance.getAttribute('value');
          let mountingPracedValue = parseFloat(mountingGetValue);
          console.log("Mounting and Balance (Goods) Price is = ", mountingPracedValue);
          
          //Wheel Nuts (goods)
          let wheelNuts = await driver.findElement(By.xpath("(//button[contains(@type,'button')])[11]"));
            await wheelNuts.click();
          
          //Ontario Tire Stewardship Fee(Services)
          let tireStewardElement = await driver.findElement(By.xpath("(//input[@id='1'])[13]"));
          let tireStewardGet = await tireStewardElement.getAttribute('value');
          let tireStewardParced = parseFloat(tireStewardGet);
          console.log("Ontario Tire Stewardship Fee ($4.50/tire) = ", tireStewardParced);
          
          //Weights and Values Kit
          let weightsAndValues = await driver.findElement(By.xpath("(//input[@id='1'])[16]"));
          let getWeightsAndValues = await weightsAndValues.getAttribute('value');
          let parsedWV = parseFloat(getWeightsAndValues);
          console.log("Weights and Values Kit = ", parsedWV);

          //Added New upsell Service
          let addUpSell = await driver.findElement(By.xpath("(//i[@class='fa fa-plus-circle'])[1]"));
          await addUpSell.click()
          let inputUpSell = await driver.findElement(By.xpath("(//input[contains(@name,'name[4][0]')])[1]"));
          await inputUpSell.sendKeys("New Service is Added");

          let addPriceUS= await driver.findElement(By.xpath("(//input[@name='price[4][0]'])[1]"));
          await addPriceUS.sendKeys("34.52")

          let getAddedSer = await driver.findElement(By.xpath("(//input[@name='price[4][0]'])[1]"));
          let fetchAddedSer = await getAddedSer.getAttribute('value');
          let parsedAddedSer = parseFloat(fetchAddedSer);
          console.log("Newly Added Service", parsedAddedSer);
          //Adding Shopper
          let shopperElement = await driver.findElement(By.xpath("(//span[@class='hidden-xs b_size'][normalize-space()='Add'])[4]"));
          await driver.executeScript("arguments[0].scrollIntoView(true);", shopperElement);
          await shopperElement.click();

          let shopperInputNew = await driver.findElement(By.xpath("//div[@class='panel panel-default carshowpanel carshowpanel0']//div[@id='service-rows3']//div[@class='col-lg-2 col-md-3 col-sm-4 col-xs-3 service-row-right']//input[1]"));
          let getShopperPriceNew = await shopperInputNew.getAttribute('value');
          let parsedShopperNew = parseFloat(getShopperPriceNew);
          console.log("Newely added Shopper Cost", parsedShopperNew);

          let onlyUpsell = mountingPracedValue+tireStewardParced+parsedWV+parsedAddedSer
          console.log("Only Upsell Items Addition ", onlyUpsell);
          
          let additionOfUpSellNew = mountingPracedValue+tireStewardParced+parsedWV+parsedAddedSer+parsedShopperNew
          // let subtotalPrice = additionOfAddOns+totalPrice;
          console.log("Final Price after Calculation is (additionOfAddOns) = ", additionOfUpSellNew); 
          await driver.executeScript(`sessionStorage.setItem('additionOfUpSellNon',${additionOfUpSellNew})`);
          let getSubOneNew =await driver.executeScript('return sessionStorage.getItem("parsedSubOneNonTPMS")');
          let parsedSubOneNew = parseFloat(getSubOneNew)
          let subTwoNew = (additionOfUpSellNew+parsedSubOneNew).toFixed(2);
          let parsedSubTwoNew = parseFloat(subTwoNew);
          console.log("Subtotal-2 after modifying upsell Items ", parsedSubTwoNew);
          await driver.executeScript(`sessionStorage.setItem('parsedSubTwoNew',${parsedSubTwoNew})`);

          return [onlyUpsell, parsedShopperNew,parsedSubTwoNew];


    }
    //--------------------------------Calculating tax After Modifying UpSell and Shopper
    async function addingTaxNew(driver){
        await driver.manage().setTimeouts({implicit: 5000});
        //extracting tax Percentage
        let taxPercentNew = await driver.findElement(By.css("body > form:nth-child(10) > div:nth-child(16) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > div:nth-child(1) > div:nth-child(11) > div:nth-child(3) > div:nth-child(27) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(5) > th:nth-child(1)"));
        let getTaxPercentNew = await taxPercentNew.getText();
        let taxPerOnlyNumbersNew = getTaxPercentNew.match(/\d+\.\d+/g)
        let parsedTaxPerNew = parseFloat(taxPerOnlyNumbersNew);
        console.log("Tax Percentage ", parsedTaxPerNew);
        // calculating Tax Price
        let subTwoNew =await driver.executeScript('return sessionStorage.getItem("parsedSubTwoNew")');
        
        let parsedSubtotalTwoNew = parseFloat(subTwoNew);
        let taxPriceNew = ((parsedSubtotalTwoNew*parsedTaxPerNew)/100).toFixed(2);
        let parsedTaxPriceNew = parseFloat(taxPriceNew);
        console.log("calculated Tax Price after Modifying upsell and Shoppers = ", parsedTaxPriceNew);
        //Calculating Total Price after Adding Tax
        
        let totalPriceNew = (parsedSubtotalTwoNew+parsedTaxPriceNew).toFixed(2);
        let parsedTotalPriceNew = parseFloat(totalPriceNew);
        console.log("Total Price After Modifying Upsell Items = ", parsedTotalPriceNew);
        //extracting quote id before sending quote
        let quoteIdEle = await driver.findElement(By.css("div[class='form-group'] p"));
        await driver.executeScript("arguments[0].scrollIntoView(true);", quoteIdEle);
        let quoteIdGet = await quoteIdEle.getText();
        let quoteIdParsed = parseFloat(quoteIdGet.replace(/[^\d.]/g, ''));
        console.log("Quote id is = ", quoteIdParsed);
        await driver.executeScript(`sessionStorage.setItem('quoteIdParsed',${quoteIdParsed})`);
        return [parsedTaxPriceNew,parsedTotalPriceNew];
    }
    //---------------------------------Sending Quote Page
    //Sent Quote
    async function sendQuote(driver){
        await driver.manage().setTimeouts({implicit: 5000});
        let sendButtonEle = await driver.findElement(By.css("#submit_btn_send"));
        await driver.executeScript("arguments[0].scrollIntoView(true);", sendButtonEle);
        await sendButtonEle.click();
        // Entering Details
        let firstName = await driver.findElement(By.css("#fname"));
        await firstName.sendKeys("a");
        let lastName = await driver.findElement(By.css("#lname"))
        await lastName.sendKeys("b")

        let emailId = await driver.findElement(By.css("#to_email"))
        await emailId.sendKeys("ab@gmail.com")

        //send quote Button
        let quoteSendButton = await driver.findElement(By.css("body > form:nth-child(10) > div:nth-child(19) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > button:nth-child(2)"));
        await quoteSendButton.click();

        let quoteIdFetched = await driver.executeScript('return sessionStorage.getItem("quoteIdParsed")');
        
        let searchQuoteId = await driver.findElement(By.css("#search-col-1"));
        await searchQuoteId.sendKeys(quoteIdFetched);
        
        let clickQuoteId = await driver.findElement(By.css("tbody tr:nth-child(1) td:nth-child(4) a:nth-child(1)"));
        await clickQuoteId.click();

        //Tires Per Unit
        let unitTiresSent = await driver.findElement(By.css("div[class='row tire_block'] span[class='detail_row_amount language_sing']"));
        await driver.executeScript("arguments[0].scrollIntoView(true);", unitTiresSent);
        console.log("Unit Price Sent Quote: ",unitTiresSent);
        let fetchUnitTiresSent = await unitTiresSent.getText();
        
        let parsedUnitTiresSent = parseFloat(fetchUnitTiresSent);
        console.log("Unit Price of Tires: ", parsedUnitTiresSent);

        let finalTiresPriceSent = parsedUnitTiresSent*4;
        console.log("Final Tires Price: ",finalTiresPriceSent);

        //Wheels Per Unit
        let unitWheelsSent = await driver.findElement(By.css("div[class='row wheel_block'] span[class='detail_row_amount language_sing']"));
        let fetchUnitWheelsSent = await unitWheelsSent.getText();
        
        let parsedUnitWheelsSent = parseFloat(fetchUnitWheelsSent);
        console.log("Wheels Per Unit Price: ",parsedUnitWheelsSent);
        let finalWheelsPriceSent = parsedUnitWheelsSent*4;
        console.log("Final Wheels Price: ",finalWheelsPriceSent);

        //Extracting Subtotal-1 Price Sent Quote
        let subtotalOneSent = (finalTiresPriceSent+finalWheelsPriceSent).toFixed(2);
        let parsedSubOneSent = parseFloat(subtotalOneSent);
        console.log("Subtotal-1 Sent Quote: ",parsedSubOneSent);
        await driver.executeScript(`sessionStorage.setItem('parsedSubOneSent',${parsedSubOneSent})`);
        return [finalTiresPriceSent,finalWheelsPriceSent,parsedSubOneSent];
        
    }
    async function addOnsSent(driver){
        await driver.manage().setTimeouts({implicit: 5000});
        console.log("Upsell Items List Sent Quote");
        let mountingAndBalance = await driver.findElement(By.xpath("(//input[@id='1'])[1]"));
        await driver.executeScript("arguments[0].scrollIntoView(true);", mountingAndBalance);
          let mountingGetValue = await mountingAndBalance.getAttribute('value');
          let mountingPracedValueSent = parseFloat(mountingGetValue);
          console.log("Mounting and Balance (Goods) Price is = ", mountingPracedValueSent);
          
          //Wheel Nuts (goods)
          
          //Ontario Tire Stewardship Fee(Services)
          let tireStewardElement = await driver.findElement(By.xpath("(//input[@id='1'])[4]"));
          let tireStewardGet = await tireStewardElement.getAttribute('value');
          let tireStewardParcedSent = parseFloat(tireStewardGet);
          console.log("Ontario Tire Stewardship Fee ($4.50/tire) = ", tireStewardParcedSent);
          
          //Weights and Values Kit
          let weightsAndValues = await driver.findElement(By.xpath("(//input[@id='1'])[7]"));
          let getWeightsAndValues = await weightsAndValues.getAttribute('value');
          let parsedWVSent = parseFloat(getWeightsAndValues);
          console.log("Weights and Values Kit = ", parsedWVSent);
          //New Services
          let newServices = await driver.findElement(By.xpath("(//input[@id='0'])[1]"));
          let getnewServices = await newServices.getAttribute('value');
          let parsedNewServices = parseFloat(getnewServices);
          console.log("New Services Added ", parsedNewServices);
          //--------------------------Addons Added------------
          //Adding Shopper
          
          
          let shopperInputSent = await driver.findElement(By.xpath("(//input[@id='0'])[13]"));
          await driver.executeScript("arguments[0].scrollIntoView(true);", shopperInputSent);
          let getShopperPriceSent = await shopperInputSent.getAttribute('value');
          let parsedShopperSent = parseFloat(getShopperPriceSent);
          console.log("Newely added Shopper Cost", parsedShopperSent);

          let onlyUpsellSent = mountingPracedValueSent+tireStewardParcedSent+parsedWVSent+parsedNewServices
          console.log("Only Upsell Items Addition Sent Quote ", onlyUpsellSent);
          

          let additionOfUpSellSent = mountingPracedValueSent+tireStewardParcedSent+parsedWVSent+parsedNewServices+parsedShopperSent
          // let subtotalPrice = additionOfAddOns+totalPrice;
          console.log("Final Price after Calculation is (additionOfAddOns) = ", additionOfUpSellSent); 
          await driver.executeScript(`sessionStorage.setItem('additionOfUpSellSent',${additionOfUpSellSent})`);
          let getSubOneSent =await driver.executeScript('return sessionStorage.getItem("parsedSubOneSent")');
          let parsedSub1Sent = parseFloat(getSubOneSent)
          let subTwoSent = (additionOfUpSellSent+parsedSub1Sent).toFixed(2);
          let parsedSubTwoSent = parseFloat(subTwoSent);
          console.log("Subtotal-2 Sent Page ", parsedSubTwoSent);
          await driver.executeScript(`sessionStorage.setItem('parsedSubTwoSent',${parsedSubTwoSent})`);
          return [additionOfUpSellSent,parsedShopperSent,parsedSubTwoSent];
    } 
    async function taxSentQuote(driver){
        await driver.manage().setTimeouts({implicit: 5000});
        //extracting tax Percentage
        let taxPercentSent = await driver.findElement(By.css("body > form:nth-child(11) > div:nth-child(13) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(10) > div:nth-child(2) > div:nth-child(26) > table:nth-child(11) > tbody:nth-child(1) > tr:nth-child(5) > td:nth-child(1)"));
        let getTaxPercentSent = await taxPercentSent.getText();
        let taxPerOnlyNumbersSent = getTaxPercentSent.match(/\d+\.\d+/g)
        let parsedTaxPerSent = parseFloat(taxPerOnlyNumbersSent);
        console.log("Tax Percentage Sent Quote ", parsedTaxPerSent);
        // calculating Tax Price
        let sub2Sent =await driver.executeScript('return sessionStorage.getItem("parsedSubTwoSent")');
        
        let parsedSubtotalTwoSent = parseFloat(sub2Sent);
        let taxPriceSent = ((parsedSubtotalTwoSent*parsedTaxPerSent)/100).toFixed(2);
        let parsedTaxPriceSent = parseFloat(taxPriceSent);
        console.log("calculated Tax Price in Sent Quote = ", parsedTaxPriceSent);
        //Calculating Total Price after Adding Tax
        
        let totalPriceSent = (parsedSubtotalTwoSent+parsedTaxPriceSent).toFixed(2);
        let parsedTotalPriceSent = parseFloat(totalPriceSent);
        console.log("Total Price Sent Quote = ", parsedTotalPriceSent);
        return [parsedTaxPriceSent, parsedTotalPriceSent];
    }
    //==================================Print Quote Page===========================
    async function printQuote(driver){
        let printQuoteButton = await driver.findElement(By.css("#submit_btn_print"));
        await printQuoteButton.click();
        // Save and Print
        let saveAndPrint = await driver.findElement(By.css("body > form:nth-child(11) > div:nth-child(16) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(2) > button:nth-child(2)"));
        await saveAndPrint.click();

        let bodyElement = await driver.findElement(By.tagName("body"))
        await bodyElement.click();
        await bodyElement.sendKeys(Key.ESCAPE);
        
        
    }



    function generateRandomDigit() {
        return Math.floor(Math.random() * 30);
    }
    async function exportFile(getModuleName,getBrandName,getPartNumber,getTireSize,getCarDetails,parsedUnitTires,finalTiresPriceDirect,parsedUnitWheels,finalWheelsPriceDirect,
        parsedSensorsUnit,finalSensorsPrice,parsedLabourPrice,parsedSubOneDirect,additionOfUpSell,
        parsedSubTwoDirect,parsedTaxPrice,parsedTotalPriceDirect, 
        parsedUnitTiresNon,finalTiresPriceNon,parsedUnitWheelsNon,finalWheelsPriceNon
        ,parsedSubOneNonTPMS,additionOfUpSellNon,parsedSubTwoNon,parsedTaxPriceNon,
        parsedTotalPriceNon,onlyUpsell, parsedShopperNew,parsedSubTwoNew,
    parsedTaxPriceNew,parsedTotalPriceNew,finalTiresPriceSent,finalWheelsPriceSent,parsedSubOneSent,
    additionOfUpSellSent,parsedShopperSent,parsedSubTwoSent,parsedTaxPriceSent, parsedTotalPriceSent){
        const workbook = new Workbook();
        const worksheet = workbook.addWorksheet('Packages Module');
        
        // Add headers
        worksheet.addRow(['Dealership Module',getModuleName]);
        worksheet.addRow(['Brand Name',getBrandName]);
        worksheet.addRow(['Part Number',getPartNumber]);
        worksheet.addRow(['Tire Size',getTireSize]);
        worksheet.addRow(['Car Details',getCarDetails]);
        worksheet.addRow(['', '','', '']);
        worksheet.addRow(['', '','', '']);
        worksheet.addRow(['1-Subtotals and Tax Calc','','','','','2-Deselecting TPMS']);
        worksheet.addRow(['', '','', '']);
        worksheet.addRow(['Tires Per Unit Price', parsedUnitTires , 'Tires Total Price', finalTiresPriceDirect,'','Tires Per Unit Price', parsedUnitTiresNon,'Tires Total Price',finalTiresPriceNon]);
        worksheet.addRow(['Wheels Per Unit Price', parsedUnitWheels, 'Wheels Total Price', finalWheelsPriceDirect,'','Wheels Per Unit Price', parsedUnitWheelsNon,'Wheels Total Price',finalWheelsPriceNon]);
        worksheet.addRow(['Sensors Per Unit Price', parsedSensorsUnit, 'Sensors Total Price', finalSensorsPrice,'','','','Subtotal-1',parsedSubOneNonTPMS]);
        worksheet.addRow(['','','TPMS Labour Price', parsedLabourPrice]);
        worksheet.addRow(['', '', 'Subtotal-1', parsedSubOneDirect]);
        worksheet.addRow([''])
        worksheet.addRow(['Upsell Items Total Cost', additionOfUpSell, '','','','Upsell Items Cost',additionOfUpSellNon]);
        worksheet.addRow(['Upsell + Subtotal-1 ', parsedSubTwoDirect, 'Subtotal-2', parsedSubTwoDirect,'','Upsell + Subtotal-1',parsedSubTwoNon,'Subtotal-2',parsedSubTwoNon]);
        worksheet.addRow([''])
        worksheet.addRow(['', '', '13% Tax of Subtotal-2', parsedTaxPrice,'','','','13% Tax of Subtotal-2',parsedTaxPriceNon]);
        worksheet.addRow(['Subtotal-2 + Tax Price',parsedTotalPriceDirect ,'Total Price', parsedTotalPriceDirect,'','Subtotal-2 + Tax Includes',parsedTotalPriceNon, 'Total Price',parsedTotalPriceNon]) 
        worksheet.addRow(['', '','', '']);
        worksheet.addRow(['', '','', '']);
        worksheet.addRow(['', '','', '']);
        worksheet.addRow(['', '','', '']);
        worksheet.addRow(['3-Modifying Upsell/Shoppers']);
        worksheet.addRow(['', '','', '']);
        worksheet.addRow(['Upsell Items Cost',onlyUpsell ]);
        worksheet.addRow(['AddOns/Shoppers',parsedShopperNew]);
        worksheet.addRow(['Upsell + AddOns + Subtotal_1',parsedSubTwoNew, 'Subtotal_2', parsedSubTwoNew]);
        worksheet.addRow(['', '','', '']);
        worksheet.addRow(['', '','13% Tax of Subtotal_2', parsedTaxPriceNew]);
        worksheet.addRow(['Subtotal_2 + Tax', parsedTotalPriceNew,'Total Price', parsedTotalPriceNew]);
        worksheet.addRow(['', '','', '']);
        worksheet.addRow(['', '','', '']);
        worksheet.addRow(['Sent Quote Calculations']);
        worksheet.addRow(['']);
        worksheet.addRow(['Tires Price', finalTiresPriceSent]);
        worksheet.addRow(['Wheels Price', finalWheelsPriceSent]);
        worksheet.addRow(['Subtotal_1 Sent Quote',parsedSubOneSent]);
        worksheet.addRow(['']);
        worksheet.addRow(['Upsell Items Cost', additionOfUpSellSent]);
        worksheet.addRow(['Add On Shopper Cost', parsedShopperSent]);
        worksheet.addRow(['Subtotal_1+Upsell+Shopper', parsedSubTwoSent]);
        worksheet.addRow(['Subtotal_2 Sent Quote',parsedSubTwoSent]);
        worksheet.addRow(['']);
        worksheet.addRow(['13% Tax of Subtotal_2',parsedTaxPriceSent]);
        worksheet.addRow(['Tax+Subtotal_2',parsedTotalPriceSent]);
        worksheet.addRow(['']);
        worksheet.addRow(['Total Price in Sent Quote',parsedTotalPriceSent]);


        const boldRows = [ 8, 25,35];
        boldRows.forEach((rowIndex) => {
            worksheet.getRow(rowIndex).eachCell((cell) => {
                cell.font = { bold: true };
            });

        });  
        worksheet.eachRow((row) => {
            row.eachCell((cell) => {
                cell.alignment = { horizontal: 'center' };
            });
        });     

        worksheet.columns.forEach(column => {
            const maxLength = column.values.reduce((max, value) => {
                const length = value ? value.toString().length : 0;
                return Math.max(max, length);
            }, 0);
            column.width = maxLength < 16 ? 16 : maxLength;
        });

    
        // Add data
        // worksheet.addRow([dealershipName]);
        const folderName = 'Exported Data';
        const randomDigit = generateRandomDigit();
      
        // const timestamp = new Date().toISOString().replace(/:/g, '-');
        const fileName = `TestResult_${randomDigit}.xlsx`;
        
        // Save workbook
        const filePath = path.join(__dirname,folderName,fileName);
        // await workbook.xlsx.writeFile(`dealerships_${timestamp}.xlsx`);
        await workbook.xlsx.writeFile(filePath);
        console.log('Excel file created successfully.');
      }
      
    

(async function example() {
    let driver = await new Builder().forBrowser(Browser.CHROME).build();
    try {
        // Login
        await login(driver);
        // // Select Car from Dropdown
        await selectOptionFromDropdown(driver);
        // Details
        const [getModuleName,getBrandName,getPartNumber,getTireSize] = await submitQuoteButton(driver);
        
        
        const [getCarDetails ,parsedUnitTires,finalTiresPriceDirect,parsedUnitWheels,finalWheelsPriceDirect,parsedSensorsUnit
            ,finalSensorsPrice, parsedLabourPrice,parsedSubOneDirect] = await quoteDetailsDirect(driver);
        //upSell Items Includes
        const [additionOfUpSell,parsedSubTwoDirect] = await upSellDirect(driver);
        
        
        const [parsedTaxPrice,parsedTotalPriceDirect] = await addingTaxDirect(driver);
        // await quoteDetailsFunction(driver);
        const [parsedUnitTiresNon,finalTiresPriceNon,parsedUnitWheelsNon,finalWheelsPriceNon
            ,parsedSubOneNonTPMS] = await quoteDetailsTPMS(driver); 


        const [additionOfUpSellNon,parsedSubTwoNon] =await upSellUnCheckTPMS(driver); 
        
        const [parsedTaxPriceNon,parsedTotalPriceNon] = await addingTaxNonTPMS(driver);

        //Modifying upsell and AddOns Items
        const [onlyUpsell, parsedShopperNew,parsedSubTwoNew] = await modifyUpSell(driver);
        const [parsedTaxPriceNew,parsedTotalPriceNew] = await addingTaxNew(driver);

    const[finalTiresPriceSent,finalWheelsPriceSent,parsedSubOneSent] = await sendQuote(driver);    
    
    const[additionOfUpSellSent,parsedShopperSent,parsedSubTwoSent] = await addOnsSent(driver);
        
    const[parsedTaxPriceSent, parsedTotalPriceSent] = await taxSentQuote(driver);
        
        
        
        // // // Select Model of That Car 
        // await upSellItemsFunc(driver);
        
        
        
        // await submitQuoteButton(driver);
        await exportFile(getModuleName,getBrandName,getPartNumber,getTireSize,getCarDetails,parsedUnitTires,finalTiresPriceDirect,parsedUnitWheels,finalWheelsPriceDirect,parsedSensorsUnit
            ,finalSensorsPrice, parsedLabourPrice,parsedSubOneDirect, additionOfUpSell,
            parsedSubTwoDirect, parsedTaxPrice,parsedTotalPriceDirect,
            parsedUnitTiresNon,finalTiresPriceNon,parsedUnitWheelsNon,finalWheelsPriceNon
            ,parsedSubOneNonTPMS, additionOfUpSellNon,parsedSubTwoNon,parsedTaxPriceNon,parsedTotalPriceNon,
        onlyUpsell,parsedShopperNew,parsedSubTwoNew,parsedTaxPriceNew,parsedTotalPriceNew,
        finalTiresPriceSent,finalWheelsPriceSent,parsedSubOneSent,
        additionOfUpSellSent,parsedShopperSent,parsedSubTwoSent,parsedTaxPriceSent, parsedTotalPriceSent);
      

    } finally {
        
        await driver.quit();
    }
})();
