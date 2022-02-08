const mongoose = require('mongoose');

mongoose.connect(process.env.URI).catch((err) => { console.log(err) })