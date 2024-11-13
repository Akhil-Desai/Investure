/**
 * Calculates the cumulative return of the S&P 500 up to the given date using the formula provided from excel
 *
 * @param {Object} dataStore - An object containing the reference date as keys and values as the daily return
 * @returns {array} - An array of objects containing objects with a reference date the cumulative return upto that date
 */

const calculateTR = (dataStore) => {
    let cumulativeReturn = 0
    const cumulativeReturns = []

    Object.entries(dataStore).forEach(([key, value]) => {
        cumulativeReturn = (1 + value / 100) * (1 + cumulativeReturn) - 1;
        cumulativeReturns.push({ ReferenceDate: key, CumulativeReturn: cumulativeReturn });
     });
    return cumulativeReturns
}

module.exports = calculateTR
