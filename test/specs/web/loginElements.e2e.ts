import { expect } from '@wdio/globals'
import HomePage from '../../pageobjects/home.page'

describe('Cheapflights - Login Page', () => {

    beforeEach(async () => {
        await browser.deleteAllCookies();
        await HomePage.open();

    })

    it ('should display the Cheapflights logo & Sign in button', async () => {
        await expect(HomePage.logo).toBeDisplayed()
        await expect(HomePage.signinButton).toBeDisplayed()
    })
})

