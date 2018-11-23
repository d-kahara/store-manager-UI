import puppeteer from "puppeteer";
import faker from "faker";

const PAGE = PATH + "index.html";
describe("login page", () => {
    const user = {
        email: faker.internet.email(),
        password: faker.internet.password()
    };
    let loginButton = "#login-btn",
        input_email = "#login-email",
        input_password = "#login-password"

    let page;
    let browser;
    const width = 1080;
    const height = 960;

    beforeAll(async () => {
        browser = await puppeteer.launch({
            headless: false,
            slowMo: 10,
            args: [`--window-size=${width},${height}`]
        });
        page = await browser.newPage();
        await page.setViewport({ width, height });
    });
    afterAll(() => {
        browser.close();
    });
    it("test login non-existent user", async () => {
        await page.goto(PAGE);
        await page.type(input_email, user.email);
        await page.type(input_password, user.password );

        await page.click(loginButton);
        await page.waitFor(10000);

        let return_value = await page.evaluate(() => {
            let output = document.getElementById("output").innerHTML;
            return output === "User does not Exist. You have requested this URI [/api/v2/auth/login] but did you mean /api/v2/auth/login or /api/v1/auth/login or /api/v2/auth/logout ?";
        })
        expect(return_value).toBe(true);
    },60000)

    it("test login with wrong password", async () => {
        await page.goto(PAGE);
        await page.type(input_email, 'admin@gmail.com');
        await page.type(input_password, user.password);
        await page.click(loginButton);
        await page.waitFor(10000);
        let return_value = await page.evaluate(() => {
            let output = document.getElementById('output').innerHTML
            return output === 'Invalid login credentials.Please try again'
        })
        expect(return_value).toBe(true)
    },60000)

})