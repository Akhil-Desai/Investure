const express = require("express")
const xlsx = require("xlsx")

const fileUpload = require("express-fileupload")

const PORT = process.env.PORT || 5001;

const app = express()

const inMemoryDataStore = {}




//Middleware to convert file into computer readable data
app.use(fileUpload({ limits: { fileSize: 10 * 1024 * 1024 } }));

app.post('/upload', (req,res) => {

    try {
        if(req.files && req.files.file) {
            const uploadFile = req.files.file

            const workbook = xlsx.read(uploadFile.data, {type: "buffer"})

            const sheetNames = workbook.SheetNames[0]
            const rawdata_worksheet = workbook.Sheets[sheetNames]


            const jsonData = xlsx.utils.sheet_to_json(rawdata_worksheet);

            jsonData.forEach(row => {
                const dateKey = row.ReferenceDate
                const value = row.DailyReturn
                if (dateKey) {
                    inMemoryDataStore[dateKey] = value
                }
            })

            res.status(200).json({message: 'File uploaded and data stored successfully'});

        }
        else {
            res.status(400).json({message: 'No file received'});
        }
    } catch (error) {
        res.status(500).json({message: "Error processing file", error: error.message});
    }
})

app.get('/getTotalReturns', (req, res) => {
    try{
        if(Object.keys(inMemoryDataStore).length > 0) {
            res.status(200).json({message: "endpoint is setup"})
        }
        else{
            res.status(400).json({message: "There is no data to fetch, please make sure you have uploaded a file"})
        }
    } catch (error){
        res.status(500).json({message:"Error fetching data", error: error.message})
    }
}
)

app.get('/', (req, res) => {
    res.send('Server is running!');
  });


app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
