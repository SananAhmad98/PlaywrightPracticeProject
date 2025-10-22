import { expect, type Locator, type Page } from '@playwright/test';

export class LoginPage
{

    page:Page;
    loginButton:Locator;
    userName: Locator;
    userPass: Locator;

constructor(page:Page){

    this.page = page;
    this.loginButton = page.locator('#login');
    this.userName = page.locator('#userEmail');
    this.userPass = page.locator('#userPassword');

}

async landOnLoginPage(url:string){

    await this.page.goto(url);

}

async validLogin(username:string,password:string){

await this.userName.fill(username);
await this.userPass.fill(password);
await this.loginButton.click();


}

}