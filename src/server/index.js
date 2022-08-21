// most required packages are already added by following the script:
// dotenv, to secure the API Key, express to start the app, Cors allows the browser and server to communicate without any security interruptions, etc.
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const express = require('express');
const path = require('path');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
// fetch had some compatibility issues, thus the complicated import...

// const mockAPIResponse = require('./mockAPI.js')
// → no longer needed for the NLP part of the project

dotenv.config();


// Start up an instance of app
const app = express()

// Let the app use the packages from above
app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static('dist'))

// as in the script, the first app.get function:
app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
    //res.sendFile(path.resolve('src/client/views/index.html'))
})

/* MockAPI no longer needed, thus only here as a comment
app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})*/

// Setting uo the API to meaningcloud:
const baseURL = 'https://api.meaningcloud.com/sentiment-2.1?'
// the API Key is stored in the .env file (thus requiring dotenv above). Now my key is only visbile to me :)
const apiKey = process.env.API_KEY
// set up a blank  container for the future user input (it will be a url to an article or blogpost)
let userInput = [] 
// This is the spicy part: setting up the post route at location /api
app.post('/api', async (req, res) => {
    // userInput reads the URL that is put in the form from the user
    userInput = req.body.url;
    // build complete URL for our API
    const apiURL = `${baseURL}key=${apiKey}&url=${userInput}&lang=en`
    
    // throw a fetch onto the API
    const fetchedFromAPI = await fetch(apiURL )
    // extract the data in json format
    .then((response) => response.json())
    .then((data) => {
        console.log(data),
        res.send(data)
    })
    }
    //const apiData = await fetchedFromAPI.json()
        // response from the post function will be the json-formatted data from the API call
        
)

// as done by following the script, we are an port 8081 now, nevertheless we could switch to whatever we want to
app.listen(8081, function () {
    console.log('Example app listening on port 8081!')
})