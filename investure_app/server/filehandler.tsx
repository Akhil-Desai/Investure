const xlsx = require("xlsx")

const processFileUpload = (file: any, dataStore: Object) => {

    const workbook = xlsx.read(file.data, {type: "buffer"})
    const sheetNames = workbook.SheetNames[0]
    const rawdata_worksheet = workbook.Sheets[sheetNames]

    const jsonData = xlsx.utils.sheet_to_json(rawdata_worksheet);

    jsonData.forEach(row => {
        const dateKey = row.ReferenceDate
        const value = row.DailyReturn
        if (dateKey) {
            dataStore[dateKey] = value
        }
    })
}

module.exports = processFileUpload
