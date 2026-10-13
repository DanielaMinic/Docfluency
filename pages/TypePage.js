import {expect} from '@playwright/test';
import CommonActions from '../utils/CommonActions.js';
export default class DelovodniPage {
        constructor(page){
        this.actions = new CommonActions(page);
    }
    async newType()
    {
        await this.actions.click('button[title="Нови тип документа"]');
    }
    async selectGroup()
    {
        await this.actions.click('text="-- Нема групу --"');
        await this.actions.click('text="Opšta"');
    }
    async enterName(name)
    {
        await this.actions.fill(':nth-match(input[inputmode="text"], 2)', name);
    }
    async enterJoint(joint)
    {
        await this.actions.fill(':nth-match(input[inputmode="text"], 3)', joint);
    }
    async enterIndex(index)
    {
        await this.actions.fill(':nth-match(input[inputmode="text"], 4)', index);
    }
    async makeType()
    {
        await this.actions.click('text="Сачувај"');
    }
    async deleteType()
    {
        await this.actions.click('text="Обриши"');
        await this.actions.click('text="Обриши"');
    }
}