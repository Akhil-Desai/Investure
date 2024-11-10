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
