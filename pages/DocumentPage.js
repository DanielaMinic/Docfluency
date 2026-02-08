import {expect} from '@playwright/test';
import CommonActions from '../utils/CommonActions';

export default class DelovodniPage {
        constructor(page){
        this.actions = new CommonActions(page);
        }
        async newDocument()
        {
            await this.actions.click('a[title="New document"]');
        }
        async nameDocument(name)
        {
            await this.actions.fill(':nth-match(input[inputmode="text"], 1)', name);
        }
        async enterDate()
        {
            await this.actions.click(':nth-match(input[inputmode="text"], 2)');
            await this.actions.click('text="8"');
        }
        async enterNote(note)
        {
            await this.actions.fill('textarea[inputmode="text"]', note);
        }
        async documentInsert(document)
        {
            await this.actions.insertDocument('input[type="file"]', document);
        }
        async makeDocument()
        {
            await this.actions.click('text="Save"');
        }
        async deleteDocument()
        {
            await this.actions.click('text="Delete"');
            await this.actions.click('text="Delete"');
        }
    }