const {Builder, Browser, By, Key, until} = require('selenium-webdriver');

(async function example() {
  let driver = await new Builder().forBrowser(Browser.EDGE).build();
  try {
    await driver.navigate().to('https://www.selenium.dev/selenium/web/mouse_interaction.html');
    await driver.sleep(5000)
    const iframe= await driver.findElement(By.xpath("//div[@id='draggable']"));
    await driver.actions()
    .scroll(0,0,0,200,iframe).perform();
    // const rightClick = await driver.findElement(By.id("click"))
    // await driver.actions().contextClick(rightClick).perform()
    // await driver.sleep(9000)
    // const inputclick = await driver.findElement(By.id("clickable"))
    // await driver.actions().sendKeys(inputclick, "aksjasfasdlk").perform()
    // await driver.sleep(4000)
    // await driver.actions().keyDown(Key.CONTROL).sendKeys('a').perform()
    // await driver.sleep(4000)
    
  } finally {
    await driver.quit();
  }
})();
// await driver.navigate().back();
    // await driver.navigate().forward();
    // await driver.navigate().refresh();
    // await driver.manage().window().maximize();
    // await driver.manage().window().minimize();
    // const windowsize =await driver.manage().window().getSize()
    // console.log(windowsize.width, " ", windowsize.height);
    // await driver.executeScript(`document.querySelector("body > div:nth-child(2) > div:nth-child(2) > main:nth-child(2) > div:nth-child(2) > div:nth-child(3) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > table:nth-child(3) > tbody:nth-child(2) > tr:nth-child(10) > td:nth-child(2) > div:nth-child(1) > ul:nth-child(2) > li:nth-child(1)").scrollIntoView()`)

    // const ele = await driver.findElement(By.css("body > div:nth-child(2) > div:nth-child(2) > main:nth-child(2) > div:nth-child(2) > div:nth-child(3) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > table:nth-child(3) > tbody:nth-child(2) > tr:nth-child(10) > td:nth-child(2) > div:nth-child(1) > ul:nth-child(2) > li:nth-child(1)"))
    // driver.actions().move({origin:ele}).perform()
//===============================Drag And Drop===================================================
    //Drag and Drop
    // const srcEle = await driver.findElement(By.id("draggable"))
    // const tarEle= await driver.findElement(By.id("droppable"))
    // await driver.actions().dragAndDrop(srcEle,tarEle).perform()
    // await driver.sleep(5000) 