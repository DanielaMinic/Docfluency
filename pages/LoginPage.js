import {expect} from '@playwright/test';
import CommonActions from '../utils/CommonActions.js';
export default class LoginPage{
    constructor(page){
        this.actions = new CommonActions(page);
        this.usernameSelector = '#username';
        this.passwordSelector = '#password';
    }
    async navigate(){
        await this.actions.navigate('https://docfluence.softfluency.com/authentication/login/')
    }
    async login(username, password){
        await this.actions.fill(this.usernameSelector, username);
        await this.actions.fill(this.passwordSelector, password);
        await this.actions.click('#kc-login');
    }
    async getErrorMessage(){
        return await this.actions.getText('#input-error');
    }
    async assertErrorMessage(expectedMessage){
        const actualMessage = await this.getErrorMessage();
        expect(actualMessage).toContain(expectedMessage);
    }
}