import {expect} from '@playwright/test';
import CommonActions from '../utils/CommonActions';

export default class ResultPage {
    constructor(page){
        this.actions = new CommonActions(page);
    }
    async getMessage(){
        return await this.actions.getText('.align-start.d-flex.flex-grow-1.gap-4.mud-elevation-0.mud-paper.py-2 > .mud-typography.mud-typography-h4');
    }
    async assertLoggedInMessage(passedMessage){
        const message = await this.getMessage();
        expect(message).toContain(passedMessage);
    }
    async goToRolePage()
    {
        await this.actions.click('a[href="roles"]');
    }
    async goToSequencePage()
    {
        await this.actions.click('a[href="sequences"]');
    }
}