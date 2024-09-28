export const getAddress = property => `${property?.address1}, ${property?.address2}, ${property?.city}, ${property?.province}, ${property?.country}`
export const getPrimary = list => list?.filter((item) => item?.primary)?.[0]
export const getClientName = client => client?.fname ? client?.fname + ' ' + client?.lname : client?.companyname



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

    const endDate = new Date(currentDate); // Start with the same date

    // Calculate the end date based on the time limit (n days, months, weeks, or years)
    switch (unit) {
        case 'days':
            endDate.setDate(currentDate.getDate() + duration);
            break;

        case 'weeks':
            endDate.setDate(currentDate.getDate() + duration * 7);
            break;

        case 'months':
            endDate.setMonth(currentDate.getMonth() + duration);
            break;

        case 'years':
            endDate.setFullYear(currentDate.getFullYear() + duration);
            break;

        default:
            break;
    }

    console.log({ endDate })

    while (currentDate <= endDate) {
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
    let currentDate = getNext17th(startDate); // Adjust to the 17th of the same or next month

    const endDate = new Date(currentDate); // Start with the same date

    // Calculate the end date based on the time limit (n days, months, weeks, or years)
    switch (unit) {
        case 'days':
            endDate.setDate(currentDate.getDate() + duration);
            break;

        case 'weeks':
            endDate.setDate(currentDate.getDate() + duration * 7);
            break;

        case 'months':
            endDate.setMonth(currentDate.getMonth() + duration);
            break;

        case 'years':
            endDate.setFullYear(currentDate.getFullYear() + duration);
            break;

        default:
            throw new Error('Invalid time unit');
    }


    while (currentDate <= endDate) {
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


