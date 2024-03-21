const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URL).then(
    () => {
        console.log("connected to Database");

    },
)
.catch((error)=>{
    console.log("Could not connected to Database" +error);
})