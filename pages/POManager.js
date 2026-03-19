import LandingPage from "./landingPage";
import LoginPage from "./LoginPage";
import SecurePage from "./SecurePage";
import NavigationComponent from "./Components/NavigationComponent";

export default class POManager {
    constructor(page) {
        this.page = page;
        this.loginPage = new LoginPage(page);
        this.landingPage = new LandingPage(page);
        this.securePage = new SecurePage(page);
        this.navigation = new NavigationComponent(page);
    }
}