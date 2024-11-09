const calculateTR = (dataStore: Object) => {
    let cumulativeReturn = 0
    const cumulativeReturns: { ReferenceDate: string; CumulativeReturn: number }[] = []

    Object.entries(dataStore).forEach(([key, value] : [string, number]) => {
        cumulativeReturn = (1 + value / 100) * (1 + cumulativeReturn) - 1;
        cumulativeReturns.push({ ReferenceDate: key, CumulativeReturn: cumulativeReturn });
     });
    return cumulativeReturns
}

module.exports = calculateTR
