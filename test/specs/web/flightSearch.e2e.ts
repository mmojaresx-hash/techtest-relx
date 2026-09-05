import { expect } from '@wdio/globals'
import HomePage from '../../pageobjects/home.page'
import FlightSearchPage from '../../pageobjects/flightSearch.page'
import { getFlightTestData, getDateParts } from '../../data/flight.data';

import allureReporter from '@wdio/allure-reporter';

async function takeScreenshot(name: string) {
    allureReporter.addAttachment(
        name,
        await browser.takeScreenshot(),
        'image/png'
    );
}


describe('Cheapflights - Flight Search', () => {

    beforeEach(async () => {
        await browser.deleteAllCookies();
        await HomePage.open()
        await browser.execute(() => {
            try {
                localStorage.clear();
            } catch (e) {
                console.log('localStorage could not be cleared');
            }
            try {
                sessionStorage.clear();
            } catch (e) {
                console.log('sessionStorage could not be cleared');
            }
        });
        await browser.maximizeWindow();
    })

    it('should search for a flight', async () => {
        // set the origin
        const originInput = await FlightSearchPage.originInput
        await expect(originInput).toBeDisplayed();
        await originInput.click();

        await browser.keys("Backspace");
        await browser.keys("Backspace");

        const data = getFlightTestData();
        await originInput.setValue(data.origin);
        await browser.pause(3000);
        const originOptions = await FlightSearchPage.originInputList
        await expect(originOptions[0]).toBeDisplayed();
        await originOptions[0].click();

        // set the destination
        const destinationInput = await FlightSearchPage.destinationInput;
        await expect(destinationInput).toBeDisplayed();
        await destinationInput.click();
        await destinationInput.setValue(data.destination);
        await browser.pause(3000);

        const destinationOptions = await FlightSearchPage.destinationInputList
        await expect(destinationOptions[0]).toBeDisplayed();
        await destinationOptions[0].click();

        // Open date picker to enter departure & return date
        const departureDateInput = await FlightSearchPage.departureDateInput;
        await expect(departureDateInput).toBeDisplayed();
        await departureDateInput.click();

        const departure = getDateParts(data.departureDate);
        const returnDate = getDateParts(data.returnDate);

        // pick departure date & return date
        await FlightSearchPage.selectDate(departure.month, departure.day, departure.year);
        await FlightSearchPage.selectDate(returnDate.month, returnDate.day, returnDate.year);

        // run search
        const searchButton = await FlightSearchPage.searchButton;
        await expect(searchButton).toBeDisplayed();
        await searchButton.click();

        // result count is greater than 0 & at least 1 result
        const flightResultsCount = FlightSearchPage.flightResultsCount;
        await flightResultsCount.waitForDisplayed();
        await expect(flightResultsCount).toBeDisplayed();
        const resultText = await flightResultsCount.getText();
        const resultCountValue = parseInt(resultText.replace(/,/g, ''), 10);
        expect(resultText).toMatch(/^\d[\d,]* flights$/);
        expect(resultCountValue).toBeGreaterThan(0);

        // Result items is greater than 0
        const flightResults = await FlightSearchPage.flightResultsContainer;
        const resultCount = await flightResults.length;
        expect(resultCount).toBeGreaterThan(0);

    })
})



