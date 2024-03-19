const { Builder, By } = require('selenium-webdriver');

async function comparePrices() {
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        // Navigate to the Demo Web Shop website
        await driver.get('https://www.demoblaze.com/');
        await driver.sleep(3000)

        // Click on a product to view its details

        // Get the unit price of the product
        let unitPriceElement = await driver.findElement(By.css("body > div:nth-child(6) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > h5:nth-child(2)"));
        let unitPriceText = await unitPriceElement.getText();
        let unitPrice = parseFloat(unitPriceText.replace(/[^\d.]/g, ''));
        
        await driver.sleep(4000)


        // Multiply single unit price with 4 to get the total calculated price
        let calculatedTotalPrice = unitPrice * 4;
        console.log("Unit Price after multiplying with quantity = ",calculatedTotalPrice)

        // Get the total price of the product
        let totalPriceElement = await driver.findElement(By.css("body > div:nth-child(6) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(2) > h5:nth-child(2)"));
        await driver.executeScript('arguments[0].scrollIntoView(true);', totalPriceElement);
        let totalPriceText = await totalPriceElement.getText();
        let totalPrice = parseFloat(totalPriceText.replace(/[^\d.]/g, ''));
        console.log("Total Price = ",totalPrice)
        await driver.sleep(3000)

        // Compare calculated total price with actual total price
        if (calculatedTotalPrice === totalPrice) {
            console.log('Test Passed: Prices match!');
        } else {
            console.log('Test Failed: Prices do not match!');
        }
    } finally {
        // Close the browser
        await driver.quit();
    }
}

comparePrices();
