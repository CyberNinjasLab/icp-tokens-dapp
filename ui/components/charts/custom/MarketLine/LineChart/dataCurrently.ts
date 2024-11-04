function formatDate(date: any) {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return year + '-' + month + '-' + day;
}

function createDatesArray() {
    const currentDate = new Date();
    let startDate = new Date(currentDate);
    startDate.setFullYear(startDate.getFullYear() - 1);

    const endDate = new Date();

    const datesArray = [];

    while (startDate <= endDate) {
        datesArray.push(formatDate(startDate));
        startDate.setDate(startDate.getDate() + 1);
    }

    return datesArray;
}

export const dates = createDatesArray();