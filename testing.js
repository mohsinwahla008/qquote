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
async function firstTestCase(driver){
  let priceOne = await driver.findElement(By.xpath("/html[1]/body[1]/div[9]/div[1]/form[1]/div[2]/div[1]/div[1]/div[1]/table[1]/tbody[1]/tr[1]/td[2]/i[3]"));
  let getPriceOnce = await priceOne.getText();
  let parsedGetPriceOne = parseFloat(getPriceOnce);
  console.log(parsedGetPriceOne);
  await driver.sleep(3000);

  //
  let priceTwo = await driver.findElement(By.xpath("/html[1]/body[1]/div[9]/div[1]/form[1]/div[3]/div[1]/div[3]/div[1]/div[1]/div[1]/div[1]/div[1]/span[2]/h5[1]/span[1]/span[1]"));
  let getPriceTwo = await priceTwo.getText();
  let parsedGetPriceTwo = parseFloat(getPriceTwo);
  console.log(parsedGetPriceTwo);
  await driver.sleep(3000);
  //
  let result = parsedGetPriceOne===parsedGetPriceTwo ? 'Test Case Passed' : 'Test Case Failed';
  return result;
}
async function secondTest(driver){
  let priceOne = await driver.findElement(By.xpath("/html[1]/body[1]/div[9]/div[1]/form[1]/div[2]/div[1]/div[1]/div[1]/table[1]/tbody[1]/tr[1]/td[2]/i[3]"));
  let getPriceOnce = await priceOne.getText();
  let parsedGetPriceOne = parseFloat(getPriceOnce);
  console.log(parsedGetPriceOne);
  await driver.sleep(3000);

  //
  let priceTwo = await driver.findElement(By.xpath("/html[1]/body[1]/div[9]/div[1]/form[1]/div[3]/div[1]/div[3]/div[1]/div[1]/div[1]/div[1]/div[1]/span[2]/h5[1]/span[1]/span[1]"));
  let getPriceTwo = await priceTwo.getText();
  let parsedGetPriceTwo = parseFloat(getPriceTwo);
  console.log(parsedGetPriceTwo);
  await driver.sleep(3000);
  //
  let secondPrice = parsedGetPriceOne===parsedGetPriceTwo ? 'Test Case Passed' : 'Test Case Failed';
  let result = secondPrice;
  return result;
}
async function exportToExcel(result){
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Test Results');

  worksheet.addRow(['Test Case ID', 'Test Case Result']);
  worksheet.addRow(['Compare Both Prices',result]);
  worksheet.addRow(['Compare 2nd Prices', result])

  await workbook.xlsx.writeFile('test_results.xlsx');
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
      
const testResult = await Promise.all([firstTestCase(driver), secondTest(driver)]);
      // const testResult = await firstTestCase(driver);
      await exportToExcel(testResult);
    } finally {
      await driver.quit();
  }
})();
// // Function to execute test cases and return results
// async function runTestCases() {
//     // Execute your test cases here
//     // Assuming you have test cases defined in functions
//     const testResults = [];
//     testResults.push({ testCase: 'Test Case 1', result: await testCase1() });
//     testResults.push({ testCase: 'Test Case 2', result: await testCase2() });
//     testResults.push({ testCase: 'Test Case 3', result: await testCase3() });

//     return testResults;
// }

// // Function to simulate test case 1
// async function testCase1() {
//     // Your test case logic here
//     return 'Pass'; // or 'Fail', depending on the test result
// }

// // Function to simulate test case 2
// async function testCase2() {
//     // Your test case logic here
//     return 'Fail'; // or 'Pass', depending on the test result
// }

// // Function to simulate test case 3
// async function testCase3() {
//     // Your test case logic here
//     return 'Pass'; // or 'Fail', depending on the test result
// }

// Export test results to Excel
// async function exportToExcel(testResults) {
//     const workbook = new ExcelJS.Workbook();
//     const worksheet = workbook.addWorksheet('Test Results');
    
//     // Add headers
//     worksheet.addRow(['Test Case', 'Result']);

//     // Add test results
//     testResults.forEach(result => {
//         worksheet.addRow([result.testCase, result.result]);
//     });

//     // Save the workbook to a file
//     await workbook.xlsx.writeFile('test_results.xlsx');
//     console.log('Test results exported to test_results.xlsx');
// }

// // Run test cases and export results to Excel
// async function main() {
//     const testResults = await runTestCases();
//     await exportToExcel(testResults);
// }

// main().catch(error => console.error('Error:', error));
