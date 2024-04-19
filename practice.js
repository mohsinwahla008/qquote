//Multiple Rows to be BOld
const boldRows = [5, 6];
boldRows.forEach((rowIndex) => {
    worksheet.getRow(rowIndex).eachCell((cell) => {
        cell.font = { bold: true };
    });
});

const { Builder, By, Key } = require('selenium-webdriver');
const { Browser } = require('selenium-webdriver/lib/capabilities');
const path = require('path');

async function login(driver) {
    await driver.manage().setTimeouts({ implicit: 5000 });

    await driver.navigate().to('https://dev.qquote.com/login');
    await driver.manage().window().maximize();
    
    const emailInput = await driver.findElement(By.css("input[name='email']"));
    await emailInput.sendKeys("testermashkraft@gmail.com");
    
    const passwordInput = await driver.findElement(By.css("input[name='password']"));
    await passwordInput.sendKeys("12345678");
    
    const loginButton = await driver.findElement(By.id("submit"));
    await loginButton.click();
    
    const clickModule = await driver.findElement(By.css("img[src='./assets/assets/dist/images/multi_tyres_icon.png']"));
    await clickModule.click();
    
    await driver.manage().setTimeouts({ implicit: 0 });
}

async function openGmailAndLogin(driver) {
    await driver.executeScript("window.open()");
    const tabs = await driver.getAllWindowHandles();
    await driver.switchTo().window(tabs[tabs.length - 1]);
    await driver.get('https://accounts.google.com/v3/signin/identifier?continue=https%3A%2F%2Fmail.google.com%2Fmail%2Fu%2F0%2F&emr=1&followup=https%3A%2F%2Fmail.google.com%2Fmail%2Fu%2F0%2F&ifkv=ARZ0qKJqVh6zc4IFxbNvk81vvhXMBFCNJ2lqqtjb4uSlEthaPYZRb6M6QqeZ-GkRZmB4XOhC4tG1&osid=1&passive=1209600&service=mail&flowName=GlifWebSignIn&flowEntry=ServiceLogin&dsh=S-553420191%3A1713530682138979&theme=mn&ddm=0');

    // Gmail login
    const emailInput = await driver.findElement(By.css('#identifierId'));
    await emailInput.sendKeys('mohsinishfaq.mashkraft@gmail.com', Key.RETURN);
    await driver.sleep(2000);
    let nextButton = await driver.findElement(By.css("button[class='VfPpkd-LgbsSe VfPpkd-LgbsSe-OWXEXe-k8QpJ VfPpkd-LgbsSe-OWXEXe-dgl2Hf nCP5yc AjY5Oe DuMIQc LQeN7 BqKGqe Jskylb TrZEUc lw1w4b'] span[class='VfPpkd-vQzf8d']"));
    await nextButton.click();


    const passwordInput = await driver.findElement(By.css("input[name='Passwd']"));
    await passwordInput.sendKeys('12345', Key.RETURN);
    await driver.sleep(3000); // Wait for Gmail to load
    

    // After logging in, you can proceed with fetching the email
}

async function fetchEmail(driver) {
    // Example: Open the first email and extract the link
    const firstEmail = await driver.findElement(By.xpath('//div[@role="tabpanel"]//span[contains(text(),"Your email subject")]'));
    await firstEmail.click();
    await driver.sleep(2000); // Wait for the email to open

    const emailContent = await driver.findElement(By.xpath('//div[contains(@class, "a3s")]'));
    const emailText = await emailContent.getText();
    
    // Extract the link from the email content
    const linkRegex = /https?:\/\/[^\s]+/;
    const linkMatch = emailText.match(linkRegex);
    const link = linkMatch ? linkMatch[0] : null;

    return link;
}

(async function example() {
    let driver = await new Builder().forBrowser(Browser.CHROME).build();
    try {
        // Login to the dashboard
        await login(driver);
        
        // Open Gmail and login
        await openGmailAndLogin(driver);

        // Fetch and extract the link from the email
        const link = await fetchEmail(driver);
        if (link) {
            // Perform actions with the link (e.g., navigate to URL, fetch data)
            console.log('Link:', link);
        } else {
            console.log('No link found in the email.');
        }
    } finally {
        // Close the WebDriver instance
        await driver.quit();
    }
})();
