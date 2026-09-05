const { $ } = require('@wdio/globals')
const Page = require('./page');


class FlightSearchPage extends Page {

    public get originInput() {
        return $('input[role="combobox"][aria-label="Origin location"]')
    }

    public get originInputList() {
        return $$('#flight-origin-smarty-input-list [role="option"]')
    }

    public get destinationInput() {
        return $('input[role="combobox"][aria-label="Destination location"]')
    }
    public get destinationInputList() {
        return $$('#flight-destination-smarty-input-list [role="option"]')
    }

    public get departureDateInput() {
        return $('div[role="button"][aria-label="Departure date"]')
    }

    public get searchButton() {
        return $('button[aria-label="Search"]')
    }

    public get flightResultsCount() {
        return $('div[role="button"].bE-8-total-link')
    }

    public get flightResultsContainer() {
        return $$('div[role="group"].Fxw9-result-item-container')
    }

    public get searchErrorMessage() {
        return $('p[role="alert"]')
    }

    async selectDate(month: string, day: number, year: number) {
        const date = await $(`div[role="button"][aria-label^="${month} ${day} ${year}"]`);
        await date.waitForDisplayed();
        await date.waitForClickable();
        await date.click();
    }

}

export default new FlightSearchPage();
