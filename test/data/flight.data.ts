export function getFlightTestData() {
    const departureDate = new Date();

    const returnDate = new Date(departureDate);
    returnDate.setDate(departureDate.getDate() + 5);

    return {
        origin: 'Manila, Philippines (MNL)',
        destination: 'Tokyo, Japan (NRT)',
        departureDate,
        returnDate
    };
}

export function getDateParts(date: Date) {
    return {
        month: date.toLocaleString('en-US', { month: 'long' }),
        day: date.getDate(),
        year: date.getFullYear()
    };
}