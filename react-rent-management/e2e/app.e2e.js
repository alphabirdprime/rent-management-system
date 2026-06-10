const puppeteer = require('puppeteer');

const appUrlBase = 'http://localhost:3009';
const routes = {
  signIn: `${appUrlBase}/sign-in`,
  signUp: `${appUrlBase}/sign-up`,
  profile: `${appUrlBase}/profile`,
  users: `${appUrlBase}/users`,
  apartments: `${appUrlBase}/apartments`,
};
const timeout = 600000;

const delay = (ms) => new Promise((resolve) => {
  setTimeout(resolve, ms);
});

let browser;
let page;
beforeAll(async () => {
  browser = await puppeteer.launch({
    headless: true,
    slowMo: 50,
    defaultViewport: {
      width: 1200,
      height: 900,
    },
  });
  page = await browser.newPage();
}, timeout);

test('admin can sign in', async () => {
  await page.goto(routes.signIn);
  await page.waitForSelector('.signin-form');

  await page.click('input[name=email]');
  await page.type('input[name=email]', 'admin@apart.com');
  await page.click('input[name=password]');
  await page.type('input[name=password]', 'admin');
  await page.click('.button-div button.right-button');
  await page.waitForSelector('.profile-page');
}, timeout);

describe('apartment flow', () => {
  test('admin can create a new apartment', async () => {
    await page.goto(routes.apartments);
    await page.waitForSelector('.apartments-page .map-flag-div');
    await delay(3000);

    await page.waitForSelector('.apartments-page .new-button');
    await page.click('.apartments-page .new-button');

    await page.waitForSelector('.apartment-dialog', { visible: true });
    await page.click('.apartment-dialog input[name=name]');
    await page.type('.apartment-dialog input[name=name]', 'test1');
    await page.click('.apartment-dialog textarea[name=description]');
    await page.type('.apartment-dialog textarea[name=description]', 'test description');
    await page.click('.apartment-dialog input[name=size]');
    await page.type('.apartment-dialog input[name=size]', '11');
    await page.click('.apartment-dialog input[name=price]');
    await page.type('.apartment-dialog input[name=price]', '100');
    await page.click('.apartment-dialog input[name=rooms]');
    await page.type('.apartment-dialog input[name=rooms]', '12');
    await page.click('.apartment-dialog input[name=latitude]');
    await page.type('.apartment-dialog input[name=latitude]', '30');
    await page.click('.apartment-dialog input[name=longitude]');
    await page.type('.apartment-dialog input[name=longitude]', '50');
    await page.click('.apartment-save-button');
    await page.waitForSelector('.apartment-save-button', { hidden: true });
    await delay(1000);
  }, timeout);
  test('admin can search apartments', async () => {
    await page.click('.apartments-page .search-button');
    await delay(2000);

    const html = await page.$eval('.apartments-page p.total-counts', (e) => e.innerHTML);
    expect(html).toEqual(expect.stringContaining('1'));
  }, timeout);
  test('admin can delete an apartment', async () => {
    await page.click('.apartments-page .delete-apartment-button');
    await page.waitForSelector('.yes-button', { visible: true });
    await page.click('.yes-button');
    await delay(2000);

    const counts = await page.$$eval('.apartments-page .delete-apartment-button', (divs) => divs.length);
    expect(counts).toEqual(0);
  }, timeout);
});

describe('user flow', () => {
  test('admin can create a new user', async () => {
    await page.goto(routes.users);

    await page.waitForSelector('.users-page .new-button');
    await page.click('.users-page .new-button');

    await page.waitForSelector('.user-dialog', { visible: true });
    await page.click('.user-dialog input[name=email]');
    await page.type('.user-dialog input[name=email]', 'test1@apart.com');
    await page.click('.user-dialog input[name=password]');
    await page.type('.user-dialog input[name=password]', 'test1');
    await page.click('.user-save-button');
    await page.waitForSelector('.user-save-button', { hidden: true });
    await delay(1000);
  }, timeout);
  test('admin can get all users', async () => {
    await page.reload();
    await page.waitForSelector('.users-page .new-button');
    await delay(2000);

    const html = await page.$eval('.users-page span.total-counts', (e) => e.innerHTML);
    expect(html).toEqual(expect.stringContaining('2'));
  }, timeout);
  test('admin can delete a user', async () => {
    await page.click('.users-page .delete-user-button');
    await page.waitForSelector('.yes-button', { visible: true });
    await page.click('.yes-button');
    await delay(2000);

    const counts = await page.$$eval('.users-page .delete-user-button', (divs) => divs.length);
    expect(counts).toEqual(0);
  }, timeout);
});

describe('routing flow', () => {
  test('user can sign out', async () => {
    await page.reload();
    await page.waitForSelector('.sign-out-button', { visible: true });
    await page.click('.sign-out-button');

    await page.waitForSelector('.signin-form');
  }, timeout);
  test('unauthed user should be navigated to SignIn page', async () => {
    await delay(1000);
    await page.goto(routes.users);
    await page.waitForSelector('.signin-form');
  }, timeout);
});

afterAll(async () => {
  await browser.close();
});
