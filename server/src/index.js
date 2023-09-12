const express = require("express")
const bodyParser = require("body-parser");
const cors = require("cors");
const api = require("../api");
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
const MONGODB_URL = process.env.MONGODB
// middleware
app.use(cors({origin: "*"}))
app.use(bodyParser.json())

app.use("/api", api)

app.listen(3030, () => {
    console.log("Server is Listening to http://localhost:3030 PORT...")
})

mongoose.connect(MONGODB_URL)