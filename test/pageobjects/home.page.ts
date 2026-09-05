const { $ } = require('@wdio/globals')
const Page = require('./page');
import { webConfig } from '../config/web.config';

class HomePage extends Page {

    public get logo() {
        return $('[aria-label="Go to the cheapflights homepage"]');
    }

    public get signinButton() {
        return $('[aria-label="Sign in"]');
    }

    async open() {
        await browser.url(webConfig.baseUrl);
    }
}

export default new HomePage();
