const {test,expect} = require("@playwright/test");

test("Calender Handling automation", async ({page}) => {

const day = "14";
const month = "11";
const year = "2026";

const dayLocator = page.locator("input[name='day']");
const monthLocator = page.locator("input[name='month']");
const yearLocator = page.locator("input[name='year']");


await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
await page.locator(".react-date-picker__inputGroup").click();
await page.locator(".react-calendar__navigation__label__labelText").click();
await page.locator(".react-calendar__navigation__label__labelText").click();
await page.getByText(year).click();
await page.locator(".react-calendar__tile").nth(Number(month)-1).click();
await page.locator("//abbr[text()='"+day+"']").click();

expect(dayLocator).toHaveAttribute("value",day);
expect(monthLocator).toHaveAttribute("value",month);
expect(yearLocator).toHaveAttribute("value",year);

});