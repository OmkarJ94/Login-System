const express = require('express');
const app = express();
app.use(express.json())
require('dotenv').config()
require("./conn/conn")
var cookieParser = require('cookie-parser')
app.use(cookieParser())
const router = require('./Router/auth');
app.use(router)
app.listen(5000)