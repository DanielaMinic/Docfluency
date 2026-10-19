import { ResultPage } from './ResultPage.js';
import { RolePage } from './RolePage.js';
import { DelovodniPage } from './DelovodniPage.js';
import { DocumentTypePage } from './DocumentTypePage.js';
import { DocumentPage } from './DocumentPage.js'
import { LoginPage } from './LoginPage.js';
import { OrgPage } from './OrgPage.js';
export default class PomManager {
    constructor(page){
        this.page = page;
        this.loginPage = new LoginPage(page);
        this.resultPage = new ResultPage(page);
        this.rolePage = new RolePage(page);
        this.sequencePage = new DelovodniPage(page);
        this.typePage = new DocumentTypePage(page);
        this.documentPage = new DocumentPage(page);
        this.orgPage = new OrgPage(page);
    }
}