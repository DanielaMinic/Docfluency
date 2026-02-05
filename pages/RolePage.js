import {expect} from '@playwright/test';
import CommonActions from '../utils/CommonActions';

export default class RolePage {
    constructor(page){
        this.actions = new CommonActions(page);
    }
    async newRole(){
        await this.actions.click('button[title="New role"]');
    }
    async nameRole(roleName){
        await this.actions.fill('input[type="text"]', roleName);
    }
    async makeRole(){
        await this.actions.click(':nth-match(button[type="submit"], 2)');
    }
    async deleteRole(){
        await this.actions.click('text="Delete"');
        await this.actions.click('text="Delete"');
    }
}