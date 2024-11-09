const calculateTotalReturns = (dataStore) => {
    let cumulativeReturn = 0
    const cumulativeReturns = []
    console.log(Object.keys(dataStore).length)
    Object.entries(dataStore).forEach(([key, value]) => {
        cumulativeReturn = (1 + value / 100) * (1 + cumulativeReturn) - 1;
        cumulativeReturns.push({ ReferenceDate: key, CumulativeReturn: cumulativeReturn });
     });
    return cumulativeReturns
}

module.exports = calculateTotalReturns
