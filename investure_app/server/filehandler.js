
const xlsx = require("xlsx")

/**
 * Processes the uploaded file to extract daily returns and store them in dataStore.
 *
 * @param {Object} file - The file object containing the uploaded data.
 * @param {Object} dataStore - An object where extracted data will be stored with dates as keys.
 *
 * @throws {Error} Throws an error if required columns are missing in the file.
 */

const processFileUpload = (file, dataStore) => {

    const workbook = xlsx.read(file.data, {type: "buffer"})
    const sheetNames = workbook.SheetNames[0]
    const rawdata_worksheet = workbook.Sheets[sheetNames]

    const jsonData = xlsx.utils.sheet_to_json(rawdata_worksheet);

    const requiredHeaders = ["Name", "ReferenceDate", "DailyReturn" ]

    if (jsonData.length > 0) {
        const columnHeaders = Object.keys(jsonData[0]);

        const presentHeaders = requiredHeaders.filter(header => !columnHeaders.includes(header))
        if (presentHeaders.length > 0){
            console.log("Required headers aren't present or additional headers not accounted for are present")
            return;
        }
    }

    jsonData.forEach(row => {
        const dateKey = row.ReferenceDate
        const value = row.DailyReturn
        if (dateKey) {
            dataStore[dateKey] = value
        }
    })
}

module.exports = processFileUpload
