class LoginPage
{

constructor(page){

    this.page = page;
    this.loginButton = page.locator('#login');
    this.userName = page.locator('#userEmail');
    this.userPass = page.locator('#userPassword');

}

async landOnLoginPage(url){

    await this.page.goto(url);

}

async validLogin(username,password){

await this.userName.fill(username);
await this.userPass.fill(password);
await this.loginButton.click();


}

}

module.exports = {LoginPage};