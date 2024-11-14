//imports
const express = require("express")
const cors = require("cors")
const fileUpload = require("express-fileupload")
const processUploadedFile = require("./FileHandler")
const calculateTotalReturns = require("./Calculations");

const PORT = process.env.PORT || 8080;
const app = express()
const inMemoryDataStore = {}


const allowedOrigins = [
    "https://investure-ten.vercel.app",
    "http://localhost:3000"
  ];

//Middleware setup
app.use(cors({
    origin: (origin, callback) => {
      if (allowedOrigins.includes(origin) || !origin) {
        // Allow requests with no origin (e.g., mobile apps or curl requests)
        callback(null, true);
      } else {
        // Deny requests from other origins
        callback(new Error('Not allowed by CORS'), false);
      }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Allowed HTTP methods
    credentials: true  // Allow cookies or credentials to be sent
  }));

/**
 * POST /upload
 * Uploads a file and processes its content.
 *
 * @route POST /upload
 * @middleware fileUpload - Middleware to handle file uploads with a file size limit of 10 MB.
 * @param {Object} req.files.file - The uploaded file.
 * @returns {Object} 200 - Success message if file uploaded and data stored.
 * @returns {Object} 400 - Error message if no file received.
 * @returns {Object} 500 - Error message if file processing fails.
 */
app.post('/upload',fileUpload({ limits: { fileSize: 10 * 1024 * 1024 } }), (req,res) => {
    try {
        if(req.files && req.files.file) {
            processUploadedFile(req.files.file, inMemoryDataStore)
            res.status(200).json({message: 'File uploaded and data stored successfully'});

        }
        else {
            res.status(400).json({message: 'No file received'});
        }
    } catch (error) {
        res.status(500).json({message: "Error processing file", error: error.message});
    }
})

/**
 * GET /getTotalReturns
 * Retrieves the cumulative returns calculated from uploaded file data.
 *
 * @route GET /getTotalReturns
 * @returns {Object} 200 - JSON object with cumulative returns if data is present.
 * @returns {Object} 400 - Error message if there is no data to fetch.
 * @returns {Object} 500 - Error message if an error occurs while fetching data.
 */
app.get('/getTotalReturns', (req, res) => {
    try{
        if(Object.keys(inMemoryDataStore).length > 0) {
            const cumulative = calculateTotalReturns(inMemoryDataStore)
            res.status(200).json(cumulative)
        }
        else{
            res.status(400).json({message: "There is no data to fetch, please make sure you have uploaded a file"})
        }
    } catch (error){
        res.status(500).json({message:"Error fetching data", error: error.message})
    }
}
)


/**
 * GET /
 * Base route to check server status.
 *
 * @route GET /
 * @returns {string} 200 - Returns a message indicating the server is running.
 */
app.get('/', (req, res) => {
    res.send('Server is running!');
  });


/**
 * Starts the server and listens on the specified port.
 */
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
