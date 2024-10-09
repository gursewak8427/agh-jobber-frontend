import moment from "moment";

export const getAddress = property => `${property?.address1}, ${property?.address2}, ${property?.city}, ${property?.province}, ${property?.country}`
export const getPrimary = list => list?.filter((item) => item?.primary)?.[0]
export const getClientName = client => client?.fname ? client?.fname + ' ' + client?.lname : client?.companyname


export const formatDate = date => moment(date, 'DD MMMM YYYY').format('YYYY-MM-DD');
export const primaryEmail = (data) => {
    if (data?.client?.email && Array.isArray(data.client.email)) {
        const primaryEmail = data.client.email.find(email => email.primary === true);
        return primaryEmail ? primaryEmail.email : null;
    }
    return null;
};
export const formatUserDate = date => moment(date).format('MMM DD, YYYY');
export const formatTime = time => {
    if (!time) {
        return 'NA';
    }
    return moment(time, 'HH:mm:ss').format('h:mmA');
};


// Generate Visits 
const getNextDayOfWeek = (date, dayOfWeek) => {
    const resultDate = new Date(date);
    const currentDay = resultDate.getDay(); // 0 for Sunday, 1 for Monday, ..., 6 for Saturday
    const distance = (dayOfWeek + 7 - currentDay) % 7; // Calculate days to the next desired day
    resultDate.setDate(resultDate.getDate() + distance);
    return resultDate;
};

export const generateVisits = (...params) => {
    const [startDate, startTime, endTime, recurrenceType, dayOfWeek, duration, unit] = params;

    console.log({ params })

    const visitArray = [];
    let currentDate;

    if (recurrenceType == "daily") {
        currentDate = new Date(startDate)
    } else {
        currentDate = getNextDayOfWeek(startDate, dayOfWeek); // Adjust to next Tuesday or any specific day
    }


    let _currentDate = new Date(startDate)
    const endDate = new Date(_currentDate); // Start with the same date

    // Calculate the end date based on the time limit (n days, months, weeks, or years)
    switch (unit) {
        case 'days':
            endDate.setDate(_currentDate.getDate() + (duration));
            break;

        case 'weeks':
            endDate.setDate(_currentDate.getDate() + (duration) * 7);
            break;

        case 'months':
            endDate.setMonth(_currentDate.getMonth() + (duration));
            break;

        case 'years':
            endDate.setFullYear(_currentDate.getFullYear() + (duration));
            break;

        default:
            break;
    }

    console.log({ endDate })

    while (currentDate < endDate) {
        visitArray.push({
            startdate: currentDate.toLocaleDateString('en-GB', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
            }),
            starttime: startTime,
            endtime: endTime,
        });


        switch (recurrenceType) {
            case 'daily':
                currentDate.setDate(currentDate.getDate() + 1); // Next day
                break;

            case 'tuesday_weekly':
                currentDate.setDate(currentDate.getDate() + 7); // Next week
                break;

            case 'tuesday_every_two_week':
                currentDate.setDate(currentDate.getDate() + 14); // Next two weeks
                break;

            default:
                break;
        }
    }

    return visitArray;
};


const getNext17th = (date) => {
    let resultDate = new Date(date);

    // If the current date is after the 17th, move to the next month
    if (resultDate.getDate() > 17) {
        resultDate.setMonth(resultDate.getMonth() + 1);
    }

    // Set the day to the 17th
    resultDate.setDate(17);
    return resultDate;
};

export const generateVisitsFor17th = (startDate, startTime, endTime, duration, unit) => {
    const visitArray = [];
    let _currentDate = new Date(startDate)
    let currentDate = getNext17th(startDate); // Adjust to the 17th of the same or next month

    const endDate = new Date(_currentDate); // Start with the same date

    // Calculate the end date based on the time limit (n days, months, weeks, or years)
    switch (unit) {
        case 'days':
            endDate.setDate(_currentDate.getDate() + (duration));
            break;

        case 'weeks':
            endDate.setDate(_currentDate.getDate() + (duration) * 7);
            break;

        case 'months':
            endDate.setMonth(_currentDate.getMonth() + (duration));
            break;

        case 'years':
            endDate.setFullYear(_currentDate.getFullYear() + (duration));
            break;

        default:
            return;
    }


    while (currentDate < endDate) {
        visitArray.push({
            startdate: currentDate.toLocaleDateString('en-GB', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
            }),
            starttime: startTime,
            endtime: endTime,
        });

        // Move to the 17th of the next month
        currentDate.setMonth(currentDate.getMonth() + 1);
        currentDate.setDate(17); // Ensure it's the 17th
    }

    return visitArray;
};



// #TODO Shift this into utility
export function nFormatter(num, digits) {
    const lookup = [
        { value: 1, symbol: "" },
        { value: 1e3, symbol: "k" },
        { value: 1e6, symbol: "M" },
        { value: 1e9, symbol: "G" },
        { value: 1e12, symbol: "T" },
        { value: 1e15, symbol: "P" },
        { value: 1e18, symbol: "E" }
    ];
    const regexp = /\.0+$|(?<=\.[0-9]*[1-9])0+$/;
    const item = lookup.findLast(item => num >= item.value);
    return item ? (num / item.value).toFixed(digits).replace(regexp, "").concat(item.symbol) : "0";
}


export const templateProductsToQuote = (quoteproducts) => {
    return quoteproducts?.map(s => s?.products)?.flat()
}