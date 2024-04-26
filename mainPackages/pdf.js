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

  //Clicking Price CheckBox
    let checkBoxPrice = await driver.findElement(By.css("div[class='panel-heading heading_1'] ins[class='iCheck-helper']"));
    await driver.executeScript("arguments[0].scrollIntoView(true);", checkBoxPrice);
    await checkBoxPrice.click();
    //Clicking Quote Details Button
    let quoteDetailButton = await driver.findElement(By.css("button[class='btn btn-default quotedetailsbtn']"));
    await driver.executeScript("arguments[0].scrollIntoView(true);", quoteDetailButton);
    await quoteDetailButton.click();
    await driver.sleep(4000)

  await driver.manage().setTimeouts({ implicit: 0 });
  
}
async function quoteDetailsDirect(driver){
    await driver.manage().setTimeouts({ implicit: 5000 });
    // Direct Subtotal and Tax Rate calculating correctly
    
    //Tires Per Unit
    let unitTires = await driver.findElement(By.css("body > form:nth-child(10) > div:nth-child(16) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > div:nth-child(2) > div:nth-child(11) > div:nth-child(3) > div:nth-child(8) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > span:nth-child(1)"));
    let fetchUnitTires = await unitTires.getText();
    let parsedUnitTires = parseFloat(fetchUnitTires);
    console.log("Unit Price of Tires: ", parsedUnitTires);

    let finalTiresPriceDirect = parsedUnitTires*4;
    console.log("Final Tires Price: ",finalTiresPriceDirect);

    //Wheels Per Unit
    let unitWheels = await driver.findElement(By.css("div[class='panel panel-default carshowpanel carshowpanel1'] div:nth-child(1) div:nth-child(2) div:nth-child(3) span:nth-child(1)"));
    let fetchUnitWheels = await unitWheels.getText();
    let parsedUnitWheels = parseFloat(fetchUnitWheels);
    console.log("Wheels Per Unit Price: ",parsedUnitWheels);
    let finalWheelsPriceDirect = parsedUnitWheels*4;
    console.log("Final Wheels Price: ",finalWheelsPriceDirect);

    //TPMS Sensors Price
    let sensorsUnitPrice = await driver.findElement(By.xpath("/html[1]/body[1]/form[1]/div[2]/div[1]/div[1]/div[3]/div[1]/div[2]/div[2]/div[3]/div[4]/div[1]/div[3]/div[3]/span[1]"))
    let fetchSensorsUnit = await sensorsUnitPrice.getText();
    let parsedSensorsUnit = parseFloat(fetchSensorsUnit);
    console.log("Sensors Per Unit Price ",parsedSensorsUnit );
    let finalSensorsPrice = parsedSensorsUnit*4;
    console.log("Final Sensors Price = ", finalSensorsPrice);
    //TPMS Labour
    let SensorsLabour = await driver.findElement(By.xpath("/html[1]/body[1]/form[1]/div[2]/div[1]/div[1]/div[3]/div[1]/div[2]/div[2]/div[3]/div[4]/div[1]/div[6]/div[4]/span[1]"));
    let fetchLabourPrice = await SensorsLabour.getText();
    let parsedLabourPrice = parseFloat(fetchLabourPrice);
    console.log("TPMS Labour = ", parsedLabourPrice);


    //Extracting Subtotal-1 Price before TPMS
    let subtotalOne = finalTiresPriceDirect+finalWheelsPriceDirect+finalSensorsPrice+parsedLabourPrice;
   let parsedSubOneDirect = parseFloat(subtotalOne);
    console.log("Direct Subtotal-1: ",parsedSubOneDirect);
    await driver.executeScript(`sessionStorage.setItem('parsedSubOneDirect',${parsedSubOneDirect})`);
    return [parsedUnitTires,finalTiresPriceDirect,parsedUnitWheels,finalWheelsPriceDirect,parsedSensorsUnit
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
    let taxPercent = await driver.findElement(By.css("body > form:nth-child(10) > div:nth-child(16) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > div:nth-child(2) > div:nth-child(11) > div:nth-child(3) > div:nth-child(28) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(5) > th:nth-child(1)"));
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
    let tpmsCheck = await driver.findElement(By.css("body > form:nth-child(10) > div:nth-child(16) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > div:nth-child(2) > div:nth-child(11) > div:nth-child(3) > p:nth-child(5) > span:nth-child(9) > div:nth-child(1) > ins:nth-child(2)"));
    await driver.executeScript("arguments[0].scrollIntoView(true);", tpmsCheck);
    await tpmsCheck.click();
                                   //calculating first Subtotal
    //Tires Per Unit
    let unitTires = await driver.findElement(By.css("body > form:nth-child(10) > div:nth-child(16) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > div:nth-child(2) > div:nth-child(11) > div:nth-child(3) > div:nth-child(8) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > span:nth-child(1)"));
    let fetchUnitTires = await unitTires.getText();
    let parsedUnitTiresNon = parseFloat(fetchUnitTires);
    console.log("Unit Price of Tires: ", parsedUnitTiresNon);
    let finalTiresPriceNon = parsedUnitTiresNon*4;
    console.log("Final Tires Price: ",finalTiresPriceNon);

    //Wheels Per Unit
    let unitWheels = await driver.findElement(By.css("div[class='panel panel-default carshowpanel carshowpanel1'] div:nth-child(1) div:nth-child(2) div:nth-child(3) span:nth-child(1)"));
    let fetchUnitWheels = await unitWheels.getText();
    let parsedUnitWheelsNon = parseFloat(fetchUnitWheels);
    console.log("Wheels Per Unit Price: ",parsedUnitWheelsNon);
    let finalWheelsPriceNon = parsedUnitWheelsNon*4;
    console.log("Final Wheels Price: ",finalWheelsPriceNon);

    //Extracting Subtotal-1 Price before TPMS
    let subtotalOneNon = finalTiresPriceNon+finalWheelsPriceNon
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
          let subTwoNon = additionOfUpSellNon+parsedSubOneNon;
          let parsedSubTwoNon = parseFloat(subTwoNon);
          console.log("Subtotal-2 None-TPMS ", parsedSubTwoNon);
          await driver.executeScript(`sessionStorage.setItem('parsedSubTwoNon',${parsedSubTwoNon})`);
          return [additionOfUpSellNon,parsedSubTwoNon];
    }
    async function addingTaxNonTPMS(driver){
        await driver.manage().setTimeouts({implicit: 5000});
        //extracting tax Percentage
        let taxPercent = await driver.findElement(By.css("body > form:nth-child(10) > div:nth-child(16) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > div:nth-child(2) > div:nth-child(11) > div:nth-child(3) > div:nth-child(28) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(5) > th:nth-child(1)"));
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
    function generateRandomDigit() {
        return Math.floor(Math.random() * 30);
    }
    async function exportFile(parsedUnitTires,finalTiresPriceDirect,parsedUnitWheels,finalWheelsPriceDirect,
        parsedSensorsUnit,finalSensorsPrice,parsedLabourPrice,parsedSubOneDirect,additionOfUpSell,
        parsedSubTwoDirect,parsedTaxPrice,parsedTotalPriceDirect, 
        parsedUnitTiresNon,finalTiresPriceNon,parsedUnitWheelsNon,finalWheelsPriceNon
        ,parsedSubOneNonTPMS,additionOfUpSellNon,parsedSubTwoNon,parsedTaxPriceNon,parsedTotalPriceNon){
        const workbook = new Workbook();
        const worksheet = workbook.addWorksheet('Packages Module');
        
        // Add headers
        worksheet.addRow(['1-Subtotals and Tax Calc','','','','','','2-Deselecting TPMS']);
        worksheet.addRow(['', '','', '']);
        worksheet.addRow(['Tires Per Unit Price', parsedUnitTires , 'Tires Total Price', finalTiresPriceDirect,'','','Tires Per Unit Price', parsedUnitTiresNon,'Tires Total Price',finalTiresPriceNon]);
        worksheet.addRow(['Wheels Per Unit Price', parsedUnitWheels, 'Wheels Total Price', finalWheelsPriceDirect,'','','Wheels Per Unit Price', parsedUnitWheelsNon,'Wheels Total Price',finalWheelsPriceNon]);
        worksheet.addRow(['Sensors Per Unit Price', parsedSensorsUnit, 'Sensors Total Price', finalSensorsPrice,'','','','','Subtotal-1',parsedSubOneNonTPMS]);
        worksheet.addRow(['','','TPMS Labour Price', parsedLabourPrice]);
        worksheet.addRow(['', '', 'Subtotal-1', parsedSubOneDirect]);
        worksheet.addRow([''])
        worksheet.addRow(['Upsell Items Total Cost', additionOfUpSell, '','','','','Upsell Items Cost',additionOfUpSellNon]);
        worksheet.addRow(['Upsell + Subtotal-1 ', parsedSubTwoDirect, 'Subtotal-2', parsedSubTwoDirect,'','','Upsell + Subtotal-1',parsedSubTwoNon,'Subtotal-2',parsedSubTwoNon]);
        worksheet.addRow([''])
        worksheet.addRow(['', '', '13% Tax of Subtotal-2', parsedTaxPrice,'','','','','13% Tax of Subtotal-2',parsedTaxPriceNon]);
        worksheet.addRow(['Subtotal-2 + Tax Price',parsedTotalPriceDirect ,'Total Price', parsedTotalPriceDirect,'','','Subtotal-2 + Tax Includes',parsedTotalPriceNon, 'Total Price',parsedTotalPriceNon]) 
        worksheet.addRow(['', '','', '']);
        
        worksheet.getRow(1).eachCell((cell) => {
            cell.font = { bold: true };
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

    //     worksheet.columns.forEach(column => {
    //       if (column.header) {
    //           column.width = column.header.length < 16 ? 16 : column.header.length;
    //       } else {
    //           // Adjust width based on content
    //           const maxLength = column.values.reduce((max, value) => {
    //               const length = value ? value.toString().length : 0;
    //               return Math.max(max, length);
    //           }, 0);
    //           column.width = maxLength < 16 ? 16 : maxLength;
    //       }
    //   });
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
        await submitQuoteButton(driver);
        
        const [parsedUnitTires,finalTiresPriceDirect,parsedUnitWheels,finalWheelsPriceDirect,parsedSensorsUnit
            ,finalSensorsPrice, parsedLabourPrice,parsedSubOneDirect] = await quoteDetailsDirect(driver);
        //upSell Items Includes
        const [additionOfUpSell,parsedSubTwoDirect] = await upSellDirect(driver);
        
        
        const [parsedTaxPrice,parsedTotalPriceDirect] = await addingTaxDirect(driver);
        // await quoteDetailsFunction(driver);
        const [parsedUnitTiresNon,finalTiresPriceNon,parsedUnitWheelsNon,finalWheelsPriceNon
            ,parsedSubOneNonTPMS] = await quoteDetailsTPMS(driver); 


        const [additionOfUpSellNon,parsedSubTwoNon] =await upSellUnCheckTPMS(driver); 
        
        const [parsedTaxPriceNon,parsedTotalPriceNon] = await addingTaxNonTPMS(driver);
        
        // // // Select Model of That Car 
        // await upSellItemsFunc(driver);
        
        
        
        // await submitQuoteButton(driver);
        await exportFile(parsedUnitTires,finalTiresPriceDirect,parsedUnitWheels,finalWheelsPriceDirect,parsedSensorsUnit
            ,finalSensorsPrice, parsedLabourPrice,parsedSubOneDirect, additionOfUpSell,
            parsedSubTwoDirect, parsedTaxPrice,parsedTotalPriceDirect,
            parsedUnitTiresNon,finalTiresPriceNon,parsedUnitWheelsNon,finalWheelsPriceNon
            ,parsedSubOneNonTPMS, additionOfUpSellNon,parsedSubTwoNon,parsedTaxPriceNon,parsedTotalPriceNon);
      

    } finally {
        await driver.quit();
    }
})();
