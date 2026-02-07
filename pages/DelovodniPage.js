import {expect} from '@playwright/test';
import CommonActions from '../utils/CommonActions';

export default class DelovodniPage {
        constructor(page){
        this.actions = new CommonActions(page);
    }
    async newSequence(){
        await this.actions.click('button[title="New Sequence"]');
    }
    async enterSequence(SequenceKey){
        await this.actions.fill(':nth-match(input[inputmode="text"], 1)', SequenceKey);
    }
    async enterName(Name)
    {
        await this.actions.fill(':nth-match(input[inputmode="text"], 2)', Name)
    }
    async selectTemplate()
    {
        await this.actions.click(':nth-match(input[inputmode="text"], 3)');
    }
    async chooseTemplate()
    {
        await this.actions.click('text="Four-digit number (e.g. 0001)"');
    }
    async makeSequence()
    {
        await this.actions.click(':nth-match(button[type="submit"], 2)');
    }
    async deleteSequence()
    {
        await this.actions.click('text="Delete"');
        await this.actions.click('text="Delete"');
    }
 }