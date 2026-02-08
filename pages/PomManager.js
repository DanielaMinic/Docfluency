import LoginPage from '../pages/LoginPage';
import ResultPage from './ResultPage';
import RolePage from './RolePage';
import DelovodniPage from './DelovodniPage';
import TypePage from './TypePage';
import DocumentPage from './DocumentPage'
export default class PomManager {
    constructor(page){
        this.page = page;
        this.loginPage = new LoginPage(page);
        this.resultPage = new ResultPage(page);
        this.rolePage = new RolePage(page);
        this.sequencePage = new DelovodniPage(page);
        this.typePage = new TypePage(page);
        this.documentPage = new DocumentPage(page);
    }
}