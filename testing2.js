const ExcelJS = require('exceljs');



const { Builder, Browser, By, Key, until } = require('selenium-webdriver');
//Winter Wheels and Tires Packages Module Task 1
async function login(driver) {
    await driver.navigate().to('https://dev.qquote.com/login');
    await driver.manage().window().maximize();
    await driver.sleep(5000);
    

    const emailInput = await driver.findElement(By.css("input[name='email']"));
    await driver.actions().sendKeys(emailInput, "testermashkraft@gmail.com").perform();
    await driver.sleep(200);

    const passwordInput = await driver.findElement(By.css("input[name='password']"));
    await driver.actions().sendKeys(passwordInput, "12345678").perform();
    await driver.sleep(200);

    const loginButton = await driver.findElement(By.id("submit"));
    await driver.actions().click(loginButton).perform();
    await driver.sleep(6000);
    const clickModule = await driver.findElement(By.css("img[src='./assets/assets/dist/images/single_tyre_icon.png']"));
    await driver.actions().click(clickModule).perform();
    await driver.sleep(6000);
}
async function searchTire(driver){
  let searchTireButton1  = await driver.findElement(By.xpath("(//input[@id='tire_size'])[1]"));
  await searchTireButton1.sendKeys("215/65R17");
  await driver.sleep(1000);
  let submitQuote= await driver.findElement(By.id("submit_btn"));
  await submitQuote.click();
  await driver.sleep(3000);
}
async function firstColumn(driver){
    let dealerShipName = await driver.findElement(By.xpath("/html[1]/body[1]/div[4]/div[1]/div[1]/div[1]/h3[1]"));
    let getDealership= await dealerShipName.getText()
    console.log("Dealership:   ", getDealership);
    // 2nd Row Tire Size
    let tireSizeRow = await driver.findElement(By.css("div[class='panel panel-default carshowpanel carshowpanel_0 '] p[class='tire_size_outer']"));
    let getTireSizeRow = await tireSizeRow.getText();
    console.log("Tire Size:   ", getTireSizeRow);
    // 3rd Row Tire Brand
    let tireBrand = await driver.findElement(By.xpath("/html[1]/body[1]/div[9]/div[1]/form[1]/div[3]/div[1]/div[3]/div[1]/div[1]/div[2]/div[1]/div[2]/div[1]/h4[1]"));
    let getTireBrand = await tireBrand.getText();
    console.log("Tire Brand:   ", getTireBrand);
        let unitPriceElement = await driver.findElement(By.css("div[class='col-sm-12 col-xs-12 no-gutter pricerangebottom pricerangebottom_0'] span[class='language_sing']"));
        
        let unitPriceText = await unitPriceElement.getText();
        let unitPrice = parseFloat(unitPriceText.replace(/[^\d.]/g, ''));
        // console.log("Extracted Per Unit Price is = ", unitPrice);
        
        await driver.sleep(4000)
        let extractQuantity = await driver.findElement(By.xpath("//input[@id='quantity']"))
        let quantityValue =  await extractQuantity.getAttribute('value');
        let parsedValue = parseFloat(quantityValue);
        await driver.sleep(3000)
        console.log("Qty:    ", parsedValue);
        return {getDealership,getTireSizeRow,getTireBrand,parsedValue}
}
async function exportToExcel(getDealership,getTireSizeRow,getTireBrand,parsedValue){
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Test Results');

//   worksheet.addRow(['Test Case ID', 'Test Case Result']);
//   worksheet.addRow(['Compare Both Prices',result]);
worksheet.addRow(['Dealership',getDealership ]);
  worksheet.addRow(['Tire Size',getTireSizeRow]);
  worksheet.addRow(['Tire Brand',getTireBrand]);
  worksheet.addRow(['Qty',parsedValue]);


  await workbook.xlsx.writeFile('test_result2.xlsx');
  console.log('Test result is exported');
}
(async function example() {
  let driver = await new Builder().forBrowser(Browser.EDGE).build();
  try {
      // Login
      await login(driver);
      //search by tire
      await searchTire(driver);
      //
      const testResult = await firstColumn(driver);
      await exportToExcel(testResult);
    } finally {
      await driver.quit();
  }
})();