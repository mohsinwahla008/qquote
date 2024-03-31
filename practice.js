const { Builder, Browser, By, Key, until, Actions } = require('selenium-webdriver');
const { Workbook } = require('exceljs');
const { createWorker } = require('tesseract.js');
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
    await searchTireButton.sendKeys("215/65R17");
    await driver.sleep(1000);
    let submitQuote= await driver.findElement(By.id("submit_btn"));
    await submitQuote.click();
    await driver.sleep(3000);
}

async function getTextFromImage(imageUrl) {
    // Create a Tesseract.js worker
    const worker = createWorker();

    try {
        // Initialize the worker
        await worker.load();
        await worker.loadLanguage('eng');
        await worker.initialize('eng');

        // Perform OCR on the image
        const { data: { text } } = await worker.recognize(imageUrl);
        console.log('Text extracted from the image:', text);

        // Close the worker
        await worker.terminate();

        return text;
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}

// Example usage
(async function example() {
    // Create a new WebDriver instance
    let driver = await new Builder().forBrowser('chrome').build();
    
    try {
      await login(driver);
      await SearchTireBySize(driver);
    //   const exportDealer = await dealershipName(driver)
    //   const exportTireSize= await tireSize(driver);
    //   const exportTotalPrice = await totalPrice(driver)
    //   await exportToExcel(exportDealer,exportTireSize,exportTotalPrice);
    const imageUrl = 'https://d1gtiet8v4nxan.cloudfront.net/uploads/manufacturers/1519628962.png?v=5185'; // Replace with the URL of your image
    getTextFromImage(imageUrl);
  
    } catch (error) {
      console.error('Error:', error);
    } finally {
      // Close the WebDriver session
      await driver.quit();
    }
  })();